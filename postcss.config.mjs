import presetEnv from 'postcss-preset-env'
import cssnano from 'cssnano'

export default {
  plugins: [presetEnv(), cssnano()],
}
