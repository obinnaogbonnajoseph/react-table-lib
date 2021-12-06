const plugin = require('tailwindcss/plugin');

const getBaseControlComponents = (theme) => ({
    '.base-radio': {
        appearance: 'none',
        border: `2.5px solid ${theme('colors').neutral['500']}`,
        borderRadius: `${theme('borderRadius').full}`,
        width: '24px',
        height: '24px',
        background: 'transparent',
        '&:checked': {
            appearance: 'none',
            border: `2.5px solid ${theme('colors').green['DEFAULT']}`,
        },
        '&:checked::before': {
            content: "' '",
            width: '12px',
            height: '12px',
            borderRadius: `${theme('borderRadius').full}`,
            backgroundColor: `${theme('colors').green['DEFAULT']}`
        },
        '&:checked:hover': {
            boxShadow: `0 0 0 5px rgba(130, 255, 174, 0.3)`
        },
        '&:hover': {
            border: `2.5px solid ${theme('colors').green['DEFAULT']}`
        },
    },
    '.base-radio-error': {
        appearance: 'none',
        border: `2.5px solid ${theme('colors').neutral['500']}`,
        borderRadius: `${theme('borderRadius').full}`,
        width: '24px',
        height: '24px',
        background: 'transparent',
        '&:checked': {
            border: `2.5px solid ${theme('colors').red['DEFAULT']}`,
        },
        '&:checked::before': {
            content: "' '",
            width: '12px',
            height: '12px',
            borderRadius: `${theme('borderRadius').full}`,
            backgroundColor: `${theme('colors').red['DEFAULT']}`
        },
        '&:checked:hover': {
            boxShadow: '0 0 0 5px rgba(255, 170, 170, 0.3)'
        },
        '&:hover': {
            border: `2.5px solid ${theme('colors').red['DEFAULT']}`
        },
    },
    '.base-radio-disabled': {
        appearance: 'none',
        border: `2.5px solid ${theme('colors').neutral['400']}`,
        borderRadius: `${theme('borderRadius').full}`,
        width: '24px',
        height: '24px',
        background: 'transparent',
        '&:checked': {
            border: `2.5px solid ${theme('colors').neutral['400']}`,
        },
        '&:checked::before': {
            content: "' '",
            width: '12px',
            height: '12px',
            borderRadius: `${theme('borderRadius').full}`,
            backgroundColor: `${theme('colors').neutral['400']}`
        }
    },
    '.base-checkbox': {
        appearance: 'none',
        background: 'transparent',
        width: '24px',
        height: '24px',
        borderRadius: '4px',
        border: `1px solid ${theme('colors').neutral['500']}`,
        '&:hover': {
            border: `1px solid ${theme('colors').green['DEFAULT']}`
        },
        '&:checked': {
            background: `${theme('colors').green['DEFAULT']}`,
            border: 'none'
        },
        '&:checked:hover': {
            boxShadow: `0 0 0 2px ${theme('colors').green['100']}`
        },
        '&:checked::before': {
            content: "' '",
            background: `${theme('colors').neutral['100']}`,
            position: 'relative',
            left: '-4px',
            width: '2px',
            height: '2px',
            boxShadow:
                `2px 0 0 ${theme('colors').neutral['100']},
                4px 0 0 ${theme('colors').neutral['100']},
                4px -2px 0 ${theme('colors').neutral['100']},
                4px -4px 0 ${theme('colors').neutral['100']},
                4px -6px 0 ${theme('colors').neutral['100']},
                4px -8px 0 ${theme('colors').neutral['100']},
                4px -10px 0 ${theme('colors').neutral['100']}`,
            transform: 'rotate(45deg)'
        }
    },
    '.base-checkbox-error': {
        appearance: 'none',
        background: 'transparent',
        width: '24px',
        height: '24px',
        borderRadius: '4px',
        border: `1px solid ${theme('colors').neutral['500']}`,
        '&:hover': {
            border: `1px solid ${theme('colors').red['DEFAULT']}`
        },
        '&:checked': {
            background: `${theme('colors').red['DEFAULT']}`,
            border: 'none'
        },
        '&:checked:hover': {
            boxShadow: `0 0 0 2px ${theme('colors').red['100']}`
        },
        '&:checked::before': {
            content: "' '",
            background: `${theme('colors').neutral['100']}`,
            position: 'relative',
            left: '-4px',
            width: '2px',
            height: '2px',
            boxShadow:
                `2px 0 0 ${theme('colors').neutral['100']},
                4px 0 0 ${theme('colors').neutral['100']},
                4px -2px 0 ${theme('colors').neutral['100']},
                4px -4px 0 ${theme('colors').neutral['100']},
                4px -6px 0 ${theme('colors').neutral['100']},
                4px -8px 0 ${theme('colors').neutral['100']},
                4px -10px 0 ${theme('colors').neutral['100']}`,
            transform: 'rotate(45deg)'
        }
    },
    '.base-checkbox-disabled': {
        appearance: 'none',
        background: 'transparent',
        width: '24px',
        height: '24px',
        borderRadius: '4px',
        border: `1px solid ${theme('colors').neutral['400']}`,
        '&:checked': {
            background: `${theme('colors').neutral['400']}`,
            border: 'none'
        },
        '&:checked::before': {
            content: "' '",
            background: `${theme('colors').neutral['100']}`,
            position: 'relative',
            left: '-4px',
            width: '2px',
            height: '2px',
            boxShadow:
                `2px 0 0 ${theme('colors').neutral['100']},
                4px 0 0 ${theme('colors').neutral['100']},
                4px -2px 0 ${theme('colors').neutral['100']},
                4px -4px 0 ${theme('colors').neutral['100']},
                4px -6px 0 ${theme('colors').neutral['100']},
                4px -8px 0 ${theme('colors').neutral['100']},
                4px -10px 0 ${theme('colors').neutral['100']}`,
            transform: 'rotate(45deg)'
        }
    },
    '.base-switch': {
        appearance: 'none',
        width: '56px',
        height: '32px',
        borderRadius: '32px',
        background: `${theme('colors').neutral['400']}`,
        transition: '0.4s',
        '&::before': {
            content: "' '",
            width: '28px',
            height: '28px',
            borderRadius: '50px',
            background: `${theme('colors').neutral['100']}`,
            marginLeft: '1px',
            transition: '0.4s'
        },
        '&:checked': {
            background: `${theme('colors').green['DEFAULT']}`
        },
        '&:checked::before': {
            transform: 'translateX(25.5px)'
        },
        '&:hover::before': {
            boxShadow: `4px 0 0 3px rgba(234, 253, 240, 0.35)`
        },
        '&:checked:hover::before': {
            boxShadow: `-4px 0 0 3px rgba(234, 253, 240, 0.35)`
        }
    },
    '.base-switch-disabled': {
        appearance: 'none',
        width: '56px',
        height: '32px',
        border: `1px solid ${theme('colors').neutral['400']}`,
        borderRadius: '32px',
        background: `${theme('colors').neutral['100']}`,
        '&::before': {
            content: "' '",
            width: '28px',
            height: '28px',
            borderRadius: '50px',
            background: `${theme('colors').neutral['400']}`,
            marginLeft: '1px',
        },
        '&:checked': {
            background: `${theme('colors').neutral['400']}`
        },
        '&:checked::before': {
            background: `${theme('colors').neutral['300']}`
        }
    }
})

module.exports = plugin(({ addComponents, theme }) => {
    const baseControlComponents = getBaseControlComponents(theme);
    addComponents(baseControlComponents);
})