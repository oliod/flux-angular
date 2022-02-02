
export const ICON_LEGAL_CONTEXT = 'shuffle';
export const ICON_FLUX = 'compare_arrows';
export const ICON_MORE = 'more_horiz';
export const ICON_ENV = 'share';
export const ICON_HELP = 'help_outline';

export const ICON_BUTTON_TEST = 'input';
export const ICON_BUTTON_CLEAR = 'clear';
export const ICON_BUTTON_CLOSE = 'close';

export const ICON_EDIT = 'mode_edit';
export const ICON_DIALOG = 'textsms';
export const ICON_RN = 'vpn_key';
export const ICON_FIELD_CLEAN = 'close';

export const ICON_ADD = 'add';
export const ICON_MENU = 'menu';

export class AppSettings {

  public static readonly URL = '/php5/bcss-test/api/';

  public static readonly REGEX = {
    NUMBER_SIMPLE: /^\d+$/,
    STRING_SIMPLE: /^[a-zA-Z0-9\_\,\+\;\-\.\=\!\?\:]{0,1000}$/,
    RN: /^[0-9]{11}$/
  };

  public static readonly DIALOG_CONF = {
    WIDTH: '20% !important',
    HEIGHT: '20% !important'
  };

  public static readonly TIMING = 1000;

}
