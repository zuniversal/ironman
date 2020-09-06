// @ts-nocheck
import { ApplyPluginsType } from '/Volumes/Mac HDD/machhd/code/react/ironman/node_modules/@umijs/runtime';
import { plugin } from './plugin';

export function getRoutes() {
  const routes = [];

  // allow user to extend routes
  plugin.applyPlugins({
    key: 'patchRoutes',
    type: ApplyPluginsType.event,
    args: { routes },
  });

  return routes;
}
