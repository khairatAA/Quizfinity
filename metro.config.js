const { getDefaultConfig } = require('@expo/metro-config');

const expoConfig = getDefaultConfig(__dirname);

module.exports = (async () => {
    const defaultConfig = expoConfig;
    defaultConfig.resolver.sourceExts.push('cjs');

    return {
        ...defaultConfig,
        transformer: {
            ...defaultConfig.transformer,
            babelTransformerPath: require.resolve('react-native-svg-transformer'),
        },
        resolver: {
            ...defaultConfig.resolver,
            assetExts: defaultConfig.resolver.assetExts.filter(ext => ext !== 'svg'),
            sourceExts: [...defaultConfig.resolver.sourceExts, 'svg'],
        },
    };
})();
