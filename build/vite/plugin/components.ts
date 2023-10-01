/**
 * On-demand components auto importing for Vue.
 * https://github.com/antfu/unplugin-vue-components
 */
import components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import IconsResolver from "unplugin-icons/resolver";

export function configAutoImportComponents() {
    return components({
        resolvers: [
            // Auto register icon component
            // see document https://github.com/antfu/unplugin-icons
            IconsResolver({
                prefix: "icon",
                // see
                enabledCollections: ["ep", "fa", "la"],
            }),

            // Auto register Element Plus components
            ElementPlusResolver({ importStyle: false }),
        ],

        dirs: ["src/components"],
        include: [/\.vue$/, /\.vue\?vue/, /\.jsx$/],
        dts: false,
    });
}
