import EventService from "@/services/EventService";

export const state = {
  events: [],
  event: {},
  totalEvents: 0,
};

export const getters = {
  catLength: (state) => state.categories.length,
  doneTodos: (state) => {
    return state.todos.filter((item) => !item.done); // same output (item) => item.done == false
  },
  activeTodosCount: (state) => {
    return state.todos.filter((item) => item.done == true).length;
  },
  getTodosById: (state) => (id) => {
    return state.todos.filter((item) => item.id == id);
  },
  getEventById: (state) => (id) => {
    return state.events.filter((event) => event.id == id); //Return output as array
  },
  getEventById2: (state) => (id) => {
    return state.events.find((event) => event.id === id); //Return output as object
  },
};

export const mutations = {
  ADD_EVENT(state, event) {
    state.events.push(event);
  },
  SET_EVENTS(state, events) {
    state.events = events;
  },
  SET_EVENT(state, event) {
    state.event = event;
  },
  SET_TOTAL_EVENT(state, total) {
    state.totalEvents = total;
  },
};
export const actions = {
  createdEvent({ commit }, event) {
    return EventService.postEvent(event).then(() => {
      commit("ADD_EVENT", event);
    });
  },
  fetchEvent({ commit }, { perPage, page }) {
    return EventService.getEvents(perPage, page)
      .then((response) => {
        commit("SET_EVENTS", response.data);
        commit("SET_TOTAL_EVENT", response.headers["x-total-count"]);
      })
      .catch((error) => {
        throw error;
      });
  },
  fetchEventById({ commit, getters }, id) {
    let event = getters.getEventById2(id);
    if (event) {
      commit("SET_EVENT", event);
    } else {
      return EventService.getEvent(id)
        .then((response) => {
          commit("SET_EVENT", response.data);
        })
        .catch((error) => {
          throw error;
        });
    }
  },
};
