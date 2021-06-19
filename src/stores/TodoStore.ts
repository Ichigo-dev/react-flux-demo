import AppDispatcher from '../dispatcher/AppDispatcher'
import { EventEmitter } from 'events'
import TodoConstants from '../constants/TodoConstants'
import assign from 'object-assign'

var _todos: any = {}

var create = (text: string) => {
  var id: string = (+new Date() + Math.floor(Math.random() * 99999)).toString(36)
  _todos[id] = {
    id: id,
    text: text,
  }
}

var destroy = (id: string) => {
  delete _todos[id]
}

const ev = new EventEmitter()
var TodoStore = assign({}, EventEmitter.prototype, {
  getAll() {
    return _todos
  },
  emitChange() {
    ev.emit("change")
  },
  addChangeLister(callback: any) {
    ev.on("change", callback)
  },
  removeEventListener(callback: any) {
    ev.removeListener("change", callback)
  }
})

AppDispatcher.register((action: any) => {
  var text: string;

  switch(action.actionType) {
    case TodoConstants.TODO_CREATE:
      text = action.text.trim();
        if(text !== '') {
          create(text)
          TodoStore.emitChange()
        }
        break
    case TodoConstants.TODO_DESTROY:
      destroy(action.id)
      TodoStore.emitChange()
      break
    default:
  }
})

export default TodoStore
