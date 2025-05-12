import React from "react";

import Div from "components/div";

import Style from "style";

const PrivacyPage = ({ device }) => {
    const { xl, lg, md, sm, isMobile, isDesktop } = device;

    let VIEW_WIDTH = "100%";
    let VIEW_HEIGHT = "100%";
    if (xl) {
        VIEW_WIDTH = "720px";
        VIEW_HEIGHT = "1080px";
    } else if (lg) {
        VIEW_WIDTH = "640px";
        VIEW_HEIGHT = "960px";
    } else if (md) {
        VIEW_WIDTH = "560px";
        VIEW_HEIGHT = "840px";
    } else if (sm) {
        VIEW_WIDTH = "480px";
        VIEW_HEIGHT = "720px";
    }

    return (
        <Div style={[Style.v_center, Style.h_p100]}>
            <Div
                className="privacyContainer"
                style={[
                    Style.column,
                    Style.position_relative,
                    Style.overflow_y_auto,
                    isMobile
                        ? { width: "100%", height: "100%" }
                        : { width: VIEW_WIDTH, height: VIEW_HEIGHT },
                    isDesktop && Style.b_light_dark,
                    isDesktop && Style.border_round_2,
                    Style.p_3,
                ]}
            >
                <Div style={[Style.column]}>
                    <Div className="h6">1. General</Div>
                    <Div className="section">
                        This privacy policy describes the policy of ShopSeeker
                        regarding the collection, use, storage, sharing and
                        protection of your personal information ("Privacy
                        Policy"). This Privacy Policy applies to the
                        www.shopseeker.com, shopseeker.com websites and all
                        related websites, applications, services and tools where
                        reference is made to this policy ("Services"),
                        regardless of how you access the Services, including
                        access through mobile devices. Scope and consent: By
                        using ShopSeeker and related Services, you give explicit
                        consent to ShopSeeker for the collection, use, disclosure
                        and retention of your personal information by us, as
                        described in this Privacy Policy and our Terms of Use.
                        ShopSeeker may change this Privacy Policy from time to
                        time. We advise you to read it regularly. Substantial
                        changes to our Privacy Policy will be announced on our
                        Website. The amended Privacy Policy will be effective
                        immediately after it is first posted on our Website.
                        This Privacy Policy is effective as of January 1, 2019.
                    </Div>

                    <Div className="h6">
                        2. What personal information do we collect
                    </Div>
                    <Div className="section">
                        You can visit our Website without registering for an
                        account. When you decide to provide us with your
                        personal information, you agree that such information is
                        sent to and stored on our servers. We collect the
                        following types of personal information: Information we
                        collect automatically: When you visit our Website, use
                        our Services and or reply to ads or other content, we
                        automatically collect the information sent to us by your
                        computer, mobile device or other equipment that provides
                        access. This information includes, but is not limited
                        to: information from your interaction with our Website
                        and Services, including, but not limited to, device ID,
                        device type, geo-location information, computer and
                        connection information, statistics on page views,
                        traffic to and from ca.sectep.com, referring URL, ad
                        data, IP address and standard web log information; and
                        information we collect through cookies, web beacons and
                        similar technologies. Information you provide to us: We
                        collect and store any information you enter on our
                        Website or that you provide to us when you use our
                        Services. This information includes, but is not limited
                        to: information that you provide to us when you register
                        for an account or for the Services that you use;
                        additional information that you may provide to us
                        through social media sites or third party Services;
                        information provided in the context of dispute
                        resolution, correspondence through our Website or
                        correspondence that is sent to us; information about
                        your location and the location of your device, including
                        your device’s unique identifier information if you have
                        enabled this service on your mobile device, and your
                        resume if you choose to submit it to us for
                        consideration through our careers page Information from
                        other sources: We may receive or collect additional
                        information about you from third parties and add this to
                        our account information. This information includes, but
                        is not limited to: demographic data, navigation data,
                        additional contact data and additional data about you
                        from other sources, such as public authorities, to the
                        extent permitted by law.
                    </Div>

                    <Div className="h6">
                        3. How we use your personal information
                    </Div>
                    <Div className="section">
                        You agree that we may use your personal information for
                        the following purposes: to provide you access to our
                        Services and Customer Support by means of e-mail or
                        telephone; to prevent, detect and investigate
                        potentially prohibited or illegal activities, fraud and
                        security breaches and to enforce our Terms of Use; to
                        personalize, measure and improve our Services, content
                        and ads; to contact you, by e-mail, push notification,
                        text message (SMS) or by telephone, to inquire about our
                        Services and the services of companies. For the purpose
                        of targeted marketing activities, updates, and
                        promotional offers based on your message preferences
                        (where applicable), or for any other purposes as set
                        forth in this Privacy Policy; to provide you with other
                        services that you have requested, as described when we
                        collected the information. We offer sign-on services
                        that enable you to access the Website or related
                        websites with your login credentials. Before personal
                        information is provided, the IP owner will enter into an
                        agreement that, inter alia, stipulates that information
                        is only provided on the strict condition that it may
                        only be used in the context of legal proceedings and/or
                        obtaining legal advice and/or to answer questions from
                        the relevant advertiser Without limitation to the
                        foregoing, we shall moreover - in our efforts to respect
                        your privacy and to keep the website free of malicious
                        persons or parties – not disclose your personal
                        information to third parties without a court order or
                        formal request from the government in accordance with
                        applicable law, unless we believe in good faith that
                        such disclosure is necessary to prevent impending injury
                        or financial damages or to report alleged illegal
                        activities. Information you share on www.shopseeker.com:
                        Our Website allows users to share advertisements and
                        other information with other users, thereby making this
                        shared information accessible to other users. Since our
                        Website also enables you to directly contact a buyer or
                        seller, we recommend that you consider how you share
                        your personal information with others. You are solely
                        responsible for the personal information you share
                        through our Website and therefore we cannot guarantee
                        the privacy or security of the information shared by you
                        with other users. In case you visit our Website from a
                        shared computer or a computer in an internet café, we
                        strongly recommend that you log off after each session.
                        If you do not want the shared computer to remember you
                        and/or your credentials, you will need to remove cookies
                        and/or the history of your website visits. Your data
                        controller may transfer data to other members of our
                        corporate family as described in this Privacy Policy who
                        may process and keep your personal information on
                        servers in the European Union, United States and our
                        data centers in other parts of the world.
                    </Div>

                    <Div className="h6">4. Marketing Purposes</Div>
                    <Div className="section">
                        You agree that we may use the information collected by
                        us to send you offers, whether personalised or not, or
                        to contact you by telephone regarding products or
                        Services offered by ShopSeeker. We will not sell or rent
                        your personal information to third parties for their
                        marketing purposes without your explicit consent. We may
                        combine your information with information we collect
                        from other companies and use it to improve and
                        personalize our Services and functionalities. When you
                        no longer wish to receive marketing communications from
                        us, you can, where applicable, change your preferences
                        in your My ShopSeeker account, or follow the unsubscribe
                        link in the marketing communication you received.
                    </Div>

                    <Div className="h6">5. Advertising</Div>
                    <Div className="section">
                        If you do not wish to participate in our advertising
                        personalization using your identified personal
                        information or re-targeting/tracking programs, you can
                        opt-out by following the directions provided within the
                        applicable advertisement, or directly at our AdChoice
                        program. The effect of an opt-out will be to stop
                        personalized advertising, but it will still allow the
                        collection of information for certain purposes such as
                        usage, research, analytics and internal online services
                        operation purposes). You may still see non-personalized
                        advertisements, including ads based on general
                        geographic region. In addition to that, we do not allow
                        third parties to track or collect your personal
                        information on our sites for their own advertising
                        purposes without your explicit consent.
                    </Div>

                    <Div className="h6">6. Cookies</Div>
                    <Div className="section">
                        When you use our Services, we and our service providers
                        may place cookies (data files on your phone or mobile
                        device’s drive) or web beacons (electronic images that
                        are placed in a web page’s code) or similar
                        technologies. We use cookies to help us identify you as
                        a user, to provide you a better experience on our
                        Website, to measure promotional effectiveness and to
                        ensure trust and safety on our Website. For more
                        detailed information about our use of these
                        technologies, we refer you to our Policy on Cookies, Web
                        beacons and Similar Technologies.
                    </Div>

                    <Div className="h6">
                        7. Accessing, Reviewing and Changing Your Personal
                        Information
                    </Div>
                    <Div className="section">
                        We cannot modify your personal information or account
                        information. You can modify your own information by
                        logging into your ShopSeeker account. When you place a
                        classified ad, you may not be able to change your
                        listing or delete your message. If you want to close
                        your account (where applicable) with us, please send us
                        a request to us here. We will process your request
                        within a reasonable period of time and process your
                        personal information in accordance with applicable law.
                        Alternatively, you can also contact Customer Support to
                        access your personal information stored by us that is
                        not directly accessible on ShopSeeker, unless we are not
                        required to provide access under applicable law. We may
                        charge a fee to compensate costs; however the fee shall
                        not exceed the amount permitted by law. If your
                        information is factually incorrect or incomplete or
                        irrelevant for the purposes for which we process your
                        information, you can request us to modify or delete your
                        information. Such requests will be handled in accordance
                        with applicable law. If you have any questions, please
                        contact us with the subject line ‘Request Privacy
                        Policy’:
                    </Div>

                    <Div className="h6">
                        8. Protection and retention of your personal information
                    </Div>
                    <Div className="section">
                        We protect your information by using technical and
                        administrative security measures (such as firewalls,
                        data encryption, and physical and administrative access
                        controls to the data and servers) that limit the risk of
                        loss, abuse, unauthorised access, disclosure, and
                        alteration. Nevertheless, if you believe your account
                        has been abused, please contact us through the Contact
                        Form. We retain personal information no longer than is
                        legally permissible and delete personal information when
                        it is no longer necessary for the purposes as described
                        above.
                    </Div>

                    <Div className="h6">9. Third-Party User Data Policy</Div>
                    <Div className="section">
                        If you choose to register to use your platform social
                        network account details (e.g. Facebook, Apple, Google),
                        you will provide us with or allow your social network
                        The network provides us with your email address, as well
                        as publicly available information. We also share certain
                        information with relevant social networks, such as your
                        application ID, access token, and referring URL.
                        According to the permissions you grant, we can obtain
                        your account information and other information It is
                        only used for registration and login, and will not
                        disclose this information to any third party, nor will
                        it be used for other commercial purposes.
                    </Div>

                    <Div className="h6">10. Other information</Div>
                    <Div className="section">
                        Abuse and unsolicited commercial communications
                        ("spam"): We do not tolerate abuse of our Website. You
                        do not have permission to add other ShopSeeker users to
                        your mailing list (e-mail or postal) for commercial
                        purposes, even if a user has purchased something from
                        you, unless the user has given his explicit consent. If
                        you notice that someone is abusing our Website (spam or
                        spoof emails), please notify us here. It is not allowed
                        to use our member-to-member communication resources to
                        send spam or content that violates our Terms of Use in
                        any other way. For your security, we may scan messages
                        automatically and check for spam, viruses, phishing and
                        other malicious activity or illegal or prohibited
                        content. We do not permanently store messages sent
                        through these resources. Third Parties: Unless
                        explicitly provided otherwise in this Privacy Policy,
                        this Privacy Policy applies only to the use and transfer
                        of information we collect from you. ShopSeeker has no
                        control over the privacy policies of third parties that
                        may apply to you. When we work with third parties or use
                        third party tools to provide certain services, we will
                        explicitly indicate which privacy policy applies to you.
                        We therefore encourage you to ask questions before you
                        disclose your personal information to others. If you
                        have an unresolved privacy or data use concern that we
                        have not addressed satisfactorily, please contact our
                        U.S.-based third party dispute resolution provider (free
                        of charge) at
                        https://feedback-form.truste.com/watchdog/request.
                    </Div>
                </Div>
            </Div>
        </Div>
    );
};

export default PrivacyPage;
