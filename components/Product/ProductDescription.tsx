import React, { useState } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

interface ProductDescriptionProps {
  description: string;
}

const ProductDescription: React.FC<ProductDescriptionProps> = ({ description }) => {
    const [webViewHeight, setWebViewHeight] = useState<number>(100);

    const htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
            <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
            <style>
            html, body {
                margin: 0;
                padding-left: 10px;
                padding-right: 10px;
                font-size: 16px;
                background: transparent;
                overflow: hidden;
            }
            img {
                max-width: 100%;
                height: auto;
            }
            </style>
        </head>
        <body>
        <h3>Description:</h3>
        ${description}
        </body>
        </html>
    `;

    const injectedJS = `
        (function() {
        function reportHeight() {
            const body = document.body;
            const html = document.documentElement;

            const height = Math.max(
            body.scrollHeight,
            body.offsetHeight,
            html.scrollHeight,
            html.offsetHeight
            );

            window.ReactNativeWebView.postMessage(JSON.stringify({ type: 'HEIGHT', height }));
        }

        // Report after images and fonts load
        window.addEventListener('load', reportHeight);

        // Watch for any layout shifts
        if (window.ResizeObserver) {
            const ro = new ResizeObserver(reportHeight);
            ro.observe(document.body);
        }

        reportHeight();
        setTimeout(reportHeight, 300);
        })();
        true;
    `;

    const handleMessage = (event: any) => {
        try {
        const data = JSON.parse(event.nativeEvent.data);
        if (data.type === 'HEIGHT' && data.height > 0) {
            setWebViewHeight(data.height);
        }
        } catch (_) {}
    };

    return (
        <View style={[styles.container, { height: webViewHeight }]}>
            <WebView
                originWhitelist={['*']}
                source={{ html: htmlContent }}
                injectedJavaScript={injectedJS}
                onMessage={handleMessage}
                scrollEnabled={false}
                showsVerticalScrollIndicator={false}
                style={styles.webView}
                backgroundColor="transparent"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: Dimensions.get('window').width,
    },
    webView: {
        flex: 1,
        backgroundColor: 'transparent',
    },
});

export default ProductDescription;