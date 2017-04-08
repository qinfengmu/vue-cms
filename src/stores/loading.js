/**
 * Created by Administrator on 2017/4/5.
 */
export default {

  state : {

    text: ''

  },
  getters: {
    getText: state => state.text
  },
  mutations: {
    setText: (state, text) => {
      state.text = text;
    }
  }

}
