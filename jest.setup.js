// This adds the custom Jest matchers for React Native Testing Library.
import "@testing-library/jest-native/extend-expect";

class XMLHttpRequest {}
global.XMLHttpRequest = XMLHttpRequest;
