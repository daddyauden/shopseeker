import React, { Fragment, FC } from "react";
import RcDrawer from "rc-drawer";

type Props = {
    open: boolean;
    width?: string | number;
    height?: string | number;
    placement?: "left" | "right" | "top" | "bottom";
    toggleHandler: any;
    onChange?: Function;
    afterVisibleChange?: Function;
    className?: string;
    children?: any;
    closeButton?: any;
    closeButtonStyle?: any;
};

const Drawer: FC<Props> = ({
    open,
    width,
    height,
    placement,
    toggleHandler,
    className,
    children,
    closeButton,
    closeButtonStyle,
    ...props
}) => {
    return (
        <Fragment>
            <RcDrawer
                open={open}
                width={width}
                height={height}
                placement={placement}
                onClose={toggleHandler}
                className={`drawer ${className ? className : ""}`.trim()}
                handler={false}
                level={null}
                duration=".4s"
                {...props}
            >
                {closeButton && (
                    <div
                        className="drawer__close"
                        onClick={toggleHandler}
                        style={closeButtonStyle}
                    >
                        {closeButton}
                    </div>
                )}
                {children}
            </RcDrawer>
        </Fragment>
    );
};

Drawer.defaultProps = {
    width: "300px",
    placement: "left",
};

export default Drawer;
