export interface ModalRenderProps {
    headerLeft?: any;
    headerTitle?: any;
    headerRight?: any;
    renderContent?: any;
    renderFooter?: any;
}

export interface ModalProps extends ModalRenderProps {
    device: any;
    transparent?: boolean;
    visible: boolean;
    style?: {
        container?: object;
        header?: object;
        content?: object;
        footer?: object;
    };
}
