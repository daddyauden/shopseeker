import React, { useEffect } from "react";

const AdBanner = ({ slotId }) => {
    useEffect(() => {
        try {
            (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch (err) {
            console.log(err);
        }
    }, []);

    return (
        <ins
            className="adsbygoogle"
            style={{
                display: "block",
                width: "728px",
                height: "90px",
            }}
            data-ad-client={process.env.NEXT_PUBLIC_GOOGLE_ADSENSE}
            data-ad-slot={slotId}
        />
    );
};

export default AdBanner;
