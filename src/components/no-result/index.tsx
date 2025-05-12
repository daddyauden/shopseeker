import { Empty } from "antd";

import { trans } from "locales";

const NoResultFound = () => {
    return (
        <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description={trans("noResultFound")}
        />
    );
};

export default NoResultFound;
