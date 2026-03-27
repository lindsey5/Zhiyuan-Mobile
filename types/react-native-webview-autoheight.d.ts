declare module 'react-native-webview-autoheight' {
    import { Component } from 'react';
    import { WebViewProps } from 'react-native-webview';

    interface AutoHeightWebViewProps extends WebViewProps {
        scrollEnabled?: boolean;
    }

    export default class AutoHeightWebView extends Component<AutoHeightWebViewProps> {}
}