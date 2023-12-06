import { iconEnums } from './constants';

export const createStylesMap = (btnStyles) => {
  const stylesMap = {
    [iconEnums.FORMAT_ALIGN_LEFT]: { textAlign: 'left' },
    [iconEnums.FORMAT_ALIGN_CENTER]: { textAlign: 'center' },
    [iconEnums.FORMAT_ALIGN_RIGHT]: { textAlign: 'right' },
    [iconEnums.FORMAT_BOLD]: {
      fontWeight: btnStyles.fontWeight === 'bold'
        ? 'normal'
        : 'bold',
    },
    [iconEnums.FORMAT_ITALIC]: {
      fontStyle: btnStyles.fontStyle === 'italic'
        ? 'normal'
        : 'italic',
    },
    [iconEnums.FORMAT_UNDERLINED]: {
      textDecoration: btnStyles.textDecoration === 'underline'
        ? 'none'
        : 'underline',
    },
  };

  return stylesMap;
};
