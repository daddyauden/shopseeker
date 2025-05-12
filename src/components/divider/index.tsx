import { FC } from "react";
import { Divider } from "antd";

type Props = {
    position?: "left" | "right" | "center";
    type?: "horizontal" | "vertical";
    dashed?: boolean;
    [name: string]: any;
};

const divider: FC<Props> = (props) => {
    const { className, dashed, position, style, type } = props;

    return (
        <Divider
            orientation={position}
            type={type}
            dashed={dashed}
            plain={false}
            className={className}
            style={{
                ...style,
                padding: 0,
                margin: 0,
            }}
        >
            {props.children}
        </Divider>
    );
};

divider.defaultProps = {
    dashed: false,
    position: "center",
    type: "horizontal",
    style: {},
};

export default divider;
