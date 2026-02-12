// Polyfill Fabric-only native function that react-native-reanimated 3.x
// references in worklets on web where it doesn't exist.
// Fixes: "Uncaught ReferenceError: _removeFromPropsRegistry is not defined"
//
// IMPORTANT: This file must have NO imports so it executes before any
// other module (Babel hoists imports above inline code).
if (typeof (globalThis as any)._removeFromPropsRegistry === 'undefined') {
  (globalThis as any)._removeFromPropsRegistry = () => {};
}
