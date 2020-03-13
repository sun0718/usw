import React from 'react'
import { Provider } from 'mobx-react'
import stores from './stores/index'

export function rootContainer(container: any) {
  return React.createElement(Provider, { stores }, container);
}