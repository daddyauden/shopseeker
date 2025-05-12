import React, { FC, forwardRef } from "react";
import _ from "lodash";

type Props = {
    ref?: any;
    [key: string]: any;
};

export const DivView: FC<Props> = forwardRef(
    ({ style, children, ...rest }, ref) => {
        const _style: any =
            !_.isNil(style) && _.isArray(style)
                ? _.reduce(
                      style,
                      (res: any, v2: any) => {
                          res = { ...res, ...v2 };
                          return res;
                      },
                      {}
                  )
                : _.isObject(style)
                ? style
                : {};

        if (ref) {
            return (
                <div ref={ref} style={_style} {...rest}>
                    {children}
                </div>
            );
        } else {
            return (
                <div style={_style} {...rest}>
                    {children}
                </div>
            );
        }
    }
);

export default DivView;
