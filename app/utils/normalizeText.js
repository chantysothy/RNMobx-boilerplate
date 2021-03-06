//
// Method to normalize size of fonts across devices
//
// Some code taken from https://jsfiddle.net/97ty7yjk/ &
// https://stackoverflow.com/questions/34837342/font-size-on-iphone-6s-plus
//
// author: @xiaoneng
// date: 14/10/2016
// version: 03
//
/** PixelRatio.get() === 1
   *     - mdpi Android devices (160 dpi)
   *   - PixelRatio.get() === 1.5
   *     - hdpi Android devices (240 dpi)
   *   - PixelRatio.get() === 2
   *     - iPhone 4, 4S
   *     - iPhone 5, 5c, 5s
   *     - iPhone 6
   *     - xhdpi Android devices (320 dpi)
   *   - PixelRatio.get() === 3
   *     - iPhone 6 plus
   *     - xxhdpi Android devices (480 dpi)
   *   - PixelRatio.get() === 3.5
   *     - Nexus 6
*/

const ReactNative = require("react-native"); // eslint-disable-line no-undef
const { PixelRatio, Dimensions } = ReactNative;

const pixelRatio = PixelRatio.get(); // 像素密度
const deviceHeight = Dimensions.get("window").height; // 屏幕像素高度
const deviceWidth = Dimensions.get("window").width; // 平模像素宽度
// const deviceScreenScale = Dimensions.get("screen").scale;

// -- Testing Only --
// const fontScale = PixelRatio.getFontScale();
// const layoutSize = PixelRatio.getPixelSizeForLayoutSize(14);
// console.log('normalizeText getPR ->', pixelRatio);
// console.log('normalizeText getFS ->', fontScale);
// console.log('normalizeText getDH ->', deviceHeight);
// console.log('normalizeText getDW ->', deviceWidth);
// console.log('normalizeText getPSFLS ->', layoutSize);

function LOG(pixelRatio, deviceWidth, size, sizeResult, ...rest) {
  if (__DEV__) {
    console.log(
      `normalize zise : pixelRatio - :${pixelRatio} - deviceWidth - :${deviceWidth} - ${size} -> ${sizeResult}`,
      ...rest
    );
  }
}
function LOG_TEXT(content) {
  if (__DEV__) {
    console.log(`Normalize description : ${content}`);
  }
}

const normalize = size => {
  if (pixelRatio === 2) {
    // iphone 5s and older Androids
    if (deviceWidth < 360) {
      LOG(
        pixelRatio,
        deviceWidth,
        size,
        size * 0.95,
        "iphone 5s and older Androids"
      );
      return size * 0.95;
    }
    // iphone 5
    if (deviceHeight < 667) {
      LOG(pixelRatio, deviceWidth, size, size, "iphone 5");
      return size;
      // iphone 6-6s
    } else if (deviceHeight >= 667 && deviceHeight <= 735) {
      LOG(pixelRatio, deviceWidth, size, size * 1.15, "iphone 6-6s");
      return size * 1.15;
    }
    // older phablets
    LOG(pixelRatio, deviceWidth, size, size * 1.25, "older phablets");
    return size * 1.25;
  }
  if (pixelRatio === 3) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    LOG_TEXT(
      `catch Android font scaling on small machines where pixel ratio / font scale ratio => 3:3`
    );
    if (deviceWidth <= 360) {
      LOG(pixelRatio, deviceWidth, size, size);
      return size;
    }
    // Catch other weird android width sizings
    if (deviceHeight < 667) {
      LOG(
        pixelRatio,
        deviceWidth,
        size,
        size * 1.15,
        "Catch other weird android width sizings"
      );
      return size * 1.15;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    LOG_TEXT(
      `catch in-between size Androids and scale font up a tad but not too much`
    );
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      LOG(pixelRatio, deviceWidth, size, size * 1.2);
      return size * 1.2;
    }
    // catch larger devices
    // ie iphone 6s plus / 7 plus / mi note 等等
    LOG(
      pixelRatio,
      deviceWidth,
      size,
      size * 1.27,
      `catch larger devices ie iphone 6s plus / 7 plus / mi note 等等`
    );
    return size * 1.27;
  }
  if (pixelRatio === 3.5) {
    // catch Android font scaling on small machines
    // where pixel ratio / font scale ratio => 3:3
    LOG_TEXT(
      `catch Android font scaling on small machines where pixel ratio / font scale ratio => 3:3`
    );
    if (deviceWidth <= 360) {
      LOG(pixelRatio, deviceWidth, size, size);
      return size;
      // Catch other smaller android height sizings
    }
    if (deviceHeight < 667) {
      LOG(
        pixelRatio,
        deviceWidth,
        size,
        size * 1.2,
        `catch in-between size Androids and scale font up a tad but not too much`
      );
      return size * 1.2;
      // catch in-between size Androids and scale font up
      // a tad but not too much
    }
    if (deviceHeight >= 667 && deviceHeight <= 735) {
      LOG(
        pixelRatio,
        deviceWidth,
        size,
        size * 1.25,
        `catch in-between size Androids and scale font up a tad but not too much`
      );
      return size * 1.25;
    }
    // catch larger phablet devices
    LOG(
      pixelRatio,
      deviceWidth,
      size,
      size * 1.4,
      "catch larger phablet devices"
    );
    return size * 1.4;
  }
  // if older device ie pixelRatio !== 2 || 3 || 3.5
  LOG(
    pixelRatio,
    deviceWidth,
    size,
    size,
    "if older device ie pixelRatio !== 2 || 3 || 3.5"
  );
  return size;
};

module.exports = normalize; // eslint-disable-line no-undef
