import { c as createAstro, a as createComponent, A as AstroError, k as AstroErrorData, r as renderTemplate, m as maybeRenderHead, h as addAttribute, j as spreadAttributes, l as getImage$1 } from './astro.9ffe222d.mjs';
import 'node:fs';
import 'node:path';
import 'node:url';
import 'slash';
import 'node:fs/promises';

const $$Astro = createAstro("https://tus.io");
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Image;
  const props = Astro2.props;
  if (props.alt === void 0 || props.alt === null) {
    throw new AstroError(AstroErrorData.ImageMissingAlt);
  }
  if (typeof props.width === "string") {
    props.width = parseInt(props.width);
  }
  if (typeof props.height === "string") {
    props.height = parseInt(props.height);
  }
  const image = await getImage(props);
  return renderTemplate`${maybeRenderHead($$result)}<img${addAttribute(image.src, "src")}${spreadAttributes(image.attributes)}>`;
}, "/Users/nick/dev/transloadit/tus.io/node_modules/astro/components/Image.astro");

const imageServiceConfig = {};
					const getImage = async (options) => await getImage$1(options, imageServiceConfig);
