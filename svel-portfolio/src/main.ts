import { mount } from 'svelte'
import App from './App/App.svelte'

const app = mount(App, {
  target: document.getElementById('app')!,
})

export default app
