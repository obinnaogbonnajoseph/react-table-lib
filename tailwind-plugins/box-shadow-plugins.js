const plugin = require('tailwindcss/plugin');

const getBoxShadowUtilities = (colors) => {
    const boxShadowUtilities = {}
    for (const [key, value] of Object.entries(colors)) {
        if (key !== 'transparent' && key !== 'current') {
            switch (key) {
                case 'neutral':
                    boxShadowUtilities[`.sharp-2-${key}`] = {
                        "box-shadow": `0px 2px 0px ${value['600']}`
                    };
                    boxShadowUtilities[`.sharp-4-${key}`] = {
                        "box-shadow": `0px 4px 0px ${value['600']}`
                    };
                    boxShadowUtilities[`.sharp-6-${key}`] = {
                        "box-shadow": `0px 6px 0px ${value['600']}`
                    }
                    break;
                default:
                    boxShadowUtilities[`.sharp-2-${key}`] = {
                        "box-shadow": `0px 2px 0px ${value['500']}`
                    };
                    boxShadowUtilities[`.sharp-4-${key}`] = {
                        "box-shadow": `0px 4px 0px ${value['500']}`
                    };
                    boxShadowUtilities[`.sharp-6-${key}`] = {
                        "box-shadow": `0px 6px 0px ${value['500']}`
                    }
            }
        }
    }
    return boxShadowUtilities;
}

module.exports = plugin(({ addUtilities, theme }) => {
    const colors = theme('colors');
    const boxShadowUtilities = getBoxShadowUtilities(colors);
    addUtilities(boxShadowUtilities);
})