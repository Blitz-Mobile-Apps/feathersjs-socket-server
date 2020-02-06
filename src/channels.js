module.exports = function(app) {
  if (typeof app.channel !== "function") {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on("connection", connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel("anonymous").join(connection);
  });

  app.on("login", (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if (connection) {
      // The connection is no longer anonymous, remove it
      app.channel("anonymous").leave(connection);

      // Add it to the authenticated user channel
      app.channel("authenticated").join(connection);
    }
  });

  app.publish((data, hook) => {
    // console.log('dasdsadsadas', data);
    if (data.type == "JOIN_CHANNEL") {
      return null;
    } else if (data.type == "SINGLE_USER") {
      const { targetUserId } = data;
      if (targetUserId) {
        const filtereduser = app
          .channel(data.channel)
          .filter(thisConnection => thisConnection.user_id == targetUserId);
        console.log("Filtered user is:", filtereduser);
        return filtereduser;
      }
    } else if (data.channel && data.channel.length > 0) {
      // console.log("Emitting event to channel: ", data.channel);
      // return app.channel(data.channel).filter(connection => connection.user_id.toString() !== data.user.user_id.toString())
      return app
        .channel(data.channel)
        .filter(
          thisConnection =>
            JSON.stringify(thisConnection) != JSON.stringify(data.connection)
        );
      // return app.channel(data.channel);
    } else {
      console.log("Emit blocked. Channel missing");
      return null;
    }
  });
};
