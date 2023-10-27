import Pages from 'vite-plugin-pages';

export function createPages() {
  return Pages({
    dirs: 'src/views',
    exclude: ['**/components/**/*.vue'],
  });
}
