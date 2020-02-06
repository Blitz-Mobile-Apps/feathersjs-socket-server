const logger = require("../logger");

module.exports = class {
  setup(app) {
    this.app = app;
  }

  constructor(params) {
    logger.info(
      `Starting service at path /${params.path}, with events: `,
      params.events
    );
    this.events = params.events;
  }

  async find(params) {
    // console.log("find triggered with: ", params);
    this.emit(params.event, params.payload);
    // this.emit(params.event, params.payload);
    // this.emit("event1", params.payload);
    // this.emit('event1', {message: "Custom emit from SERVER"});
    return true;
  }

  async get(id, params) {}
  async create(data, params) {
    console.log("Create triggered with: ", data);
    if (data.type && data.channel) {
      if (data.type == "JOIN_CHANNEL" && params.connection) {
        const { user } = data;
        if (user.type.length > 0) {
          this.app.channel("anonymous").leave(params.connection);
          params.connection.user_id = data.user.user_id;
          this.app.channel(data.channel).join(params.connection);
          // this.emit('updated', data);
          console.log(
            `Total connections in channel ${data.channel}: `,
            this.app.channel(data.channel).connections
          );
          return "Channel joined.";
        }
      } else if (
        (data.type == "SINGLE_USER" && data.target_user_id) ||
        (data.target_event.length && data.channel.length)
      ) {
        const payload = {
          channel: data.channel,
          type: data.type,
          event: data.target_event,
          targetUserId: data.target_user_id,
          payload: data.payload,
          connection: params.connection ? params.connection : undefined
        };
        this.emit(payload.event, payload);
        return payload;
        return Promise.resolve("Successfully emitted to selected user.");
      }
    }
    // this.emit(data.type, data.payload);
    logger.error("Error handling request: ", data, params);
    return Promise.reject(new Error("Cannot process your request!"));
  }
  async update(id, data, params) {}
  async patch(id, data, params) {}
  async remove(id, params) {}
};
