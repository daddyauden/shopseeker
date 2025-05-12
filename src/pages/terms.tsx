import React from "react";

import Div from "components/div";

import Style from "style";

const TermsPage = ({ device }) => {
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
                className="termsContainer"
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
                <Div className="p">
                    THIS IS A LEGAL AGREEMENT BETWEEN YOU (EITHER AN INDIVIDUAL
                    OR AN ENTITY, REFERRED TO HEREIN AS "YOU" OR "YOUR"),
                    ShopSeeker(COLLECTIVELY, "ShopSeeker"), WHICH GOVERNS YOUR USE
                    OF THE ShopSeeker CONTENT. PLEASE READ THE TERMS AND
                    CONDITIONS OF THIS AGREEMENT CAREFULLY, INCLUDING WITHOUT
                    LIMITATION ANY LINKED TERMS AND CONDITIONS APPEARING OR
                    REFERENCED BELOW, WHICH ARE HEREBY MADE PART OF THIS
                    AGREEMENT.BY USING THE ShopSeeker CONTENT AND/OR EXECUTING
                    THIS AGREEMENT, YOU ARE AGREEING THAT YOU HAVE READ, AND
                    THAT YOU AGREE TO COMPLY WITH AND TO BE BOUND BY, THE TERMS
                    AND CONDITIONS OF THIS AGREEMENT AND ALL APPLICABLE LAWS AND
                    REGULATIONS IN THEIR ENTIRETY WITHOUT LIMITATION OR
                    QUALIFICATION.IF YOU DO NOT AGREE TO BE BOUND BY THIS
                    AGREEMENT, THEN YOU MAY NOT ACCESS OR OTHERWISE USE THE
                    ShopSeeker CONTENT.THIS AGREEMENT IS EFFECTIVE AS OF THE
                    FIRST DATE THAT YOU USE THE ShopSeeker CONTENT ("EFFECTIVE
                    DATE").IF YOU ARE AN INDIVIDUAL REPRESENTING AN ENTITY, YOU
                    REPRESENT AND WARRANT THAT YOU HAVE THE APPROPRIATE
                    AUTHORITY TO ACCEPT THIS AGREEMENT ON BEHALF OF SUCH
                    ENTITY.YOU MAY NOT USE THE ShopSeeker CONTENT AND MAY NOT
                    ACCEPT THIS AGREEMENT IF YOU ARE NOT OF LEGAL AGE TO FORM A
                    BINDING CONTRACT WITH ShopSeeker, OR YOU ARE BARRED FROM
                    USING OR RECEIVING THE ShopSeeker CONTENT UNDER APPLICABLE
                    LAW.
                </Div>
                <Div className="h5">I. ShopSeeker CONTENT</Div>
                <Div className="section">
                    <Div className="h6">A. DEFINITIONS</Div>
                    <Div className="p">
                        1. "APPROVED USE" MEANS THOSE USES ENABLED THROUGH YOUR
                        CLIENT APPLICATION.
                    </Div>
                    <Div className="p">
                        2. "CLIENT AGREEMENT" MEANS THE AGREEMENT UNDER WHICH
                        YOU ARE PROVIDED ACCESS TO THE CLIENT APPLICATION.
                    </Div>
                    <Div className="p">
                        3. "CLIENT APPLICATION" MEANS THOSE TOOLS PROVIDED TO
                        YOU BY ShopSeeker.
                    </Div>
                    <Div className="p">
                        4. "FEED ID" MEANS A UNIQUE IDENTIFICATION CHARACTER
                        GENERATED FOR A FEED.
                    </Div>
                    <Div className="p">
                        5. "FEED" MEANS A SHORT-FORM TEXT AND/OR
                        MULTIMEDIA-BASED POSTING THAT IS PUBLICLY DISPLAYED ON
                        ShopSeeker APPLICATIONS.
                    </Div>
                    <Div className="p">
                        6. "ShopSeeker APPLICATIONS" MEANS ShopSeeker’S
                        CONSUMER-FACING PRODUCTS, SERVICES, APPLICATIONS,
                        WEBSITES, WEB PAGES, AND OTHER OFFERINGS, INCLUDING
                        WITHOUT LIMITATION THOSE LOCATED AT SECSTEP.COM AND THE
                        ShopSeeker MOBILE APPLICATIONS.
                    </Div>
                    <Div className="p">
                        7. "ShopSeeker CONTENT" MEANS MERCHANT, CUSTOMER, DELIVER
                        IDS, EVENTS, BUSINESS PROFILE, CHAT, MESSAGE, AND USER
                        PROFILE INFORMATION, AND ANY OTHER CONTENT OF ShopSeeker
                        PROVIDED TO YOU UNDER THIS AGREEMENT, WHETHER PROVIDED
                        DIRECTLY BY ShopSeeker OR INDIRECTLY THROUGH THE CLIENT
                        APPLICATION OR OTHERWISE, AND ANY COPIES AND DERIVATIVE
                        WORKS THEREOF.
                    </Div>
                    <Div className="h6">
                        B. LICENSE. SUBJECT TO THE TERMS AND CONDITIONS IN THIS
                        AGREEMENT AND THE CONTENT TERMS (AS A CONDITION TO THE
                        GRANT BELOW), ShopSeeker HEREBY GRANTS YOU, AND YOU
                        ACCEPT, A NON-EXCLUSIVE, ROYALTY FREE, NON-TRANSFERABLE,
                        NON-SUBLICENSABLE, REVOCABLE LICENSE DURING THE TERM
                        SOLELY TO INTERNALLY ACCESS THE ShopSeeker CONTENT
                        THROUGH THE CLIENT APPLICATION FOR THE APPROVED USE.
                    </Div>
                </Div>
                <Div className="h5">
                    II. RESTRICTIONS ON USE OF ShopSeeker CONTENT
                </Div>
                <Div className="section">
                    <Div className="h6">
                        A. DISPLAY. YOU WILL NOT DISPLAY OR OTHERWISE SHARE WITH
                        ANY THIRD PARTY ANY ShopSeeker CONTENT OR ANY
                        VISUALIZATION, FILTERING OR CURATION OF ShopSeeker
                        CONTENT, INCLUDING WITHOUT LIMITATION DISPLAYING
                        ShopSeeker CONTENT IN MASS-MARKET MEDIA AND ENTERTAINMENT
                        EVENTS, ONLINE WIDGET INTEGRATIONS OR VISUALIZATIONS,
                        TELEVISION BROADCAST, OUTDOOR ‘E-BILLBOARD’ OR OTHER
                        SIMILAR MEDIA. WITHOUT LIMITING THE GENERALITY OF THE
                        FOREGOING, YOU WILL NOT OFFER OR PROVIDE ShopSeeker
                        CONTENT, INCLUDING ANY DERIVATIVE ANALYSIS THEREOF, AS A
                        PART OF AN ADVERTISING NETWORK. YOU WILL NOT BUNDLE OR
                        COMMINGLE THE ShopSeeker CONTENT WITH OTHER DATA IN SUCH
                        A WAY THAT THE ShopSeeker CONTENT IS NOT ATTRIBUTED TO
                        ShopSeeker.
                    </Div>
                    <Div className="h6">
                        B. OTHER LIMITATIONS. YOU WILL NOT OR ATTEMPT TO (AND
                        WILL NOT ALLOW OTHERS TO){" "}
                    </Div>
                    <Div className="p">
                        (A) COPY, SELL, RENT, LEASE, SUBLICENSE, DISTRIBUTE,
                        REDISTRIBUTE, SYNDICATE, CREATE DERIVATIVE WORKS OF,
                        ASSIGN OR OTHERWISE TRANSFER OR PROVIDE ACCESS TO, IN
                        WHOLE OR IN PART, THE ShopSeeker CONTENT TO ANY THIRD
                        PARTY;
                    </Div>
                    <Div className="p">
                        (B) USE THE ShopSeeker CONTENT FOR ANY ILLEGAL,
                        UNAUTHORIZED OR OTHERWISE IMPROPER PURPOSES;
                    </Div>
                    <Div className="p">
                        (C) UTILIZE THE ShopSeeker CONTENT TO DERIVE OR OBTAIN
                        NON-PUBLIC INFORMATION OF INDIVIDUAL ShopSeeker USERS,
                        INCLUDING WITHOUT LIMITATION A USER’S LOCATION
                    </Div>
                    <Div className="p">
                        (D) ACCESS OR USE THE ShopSeeker CONTENT IN ORDER TO
                        BUILD ANY PRODUCT OR SERVICE THAT IS SIMILAR TO OR
                        COMPETITIVE WITH ANY ShopSeeker PRODUCTS OR SERVICES;
                    </Div>
                    <Div className="p">
                        (E) REMOVE OR ALTER ANY PROPRIETARY NOTICES OR MARKS ON
                        THE ShopSeeker CONTENT OR
                    </Div>
                    <Div className="p">
                        (F) USE ShopSeeker CONTENT, BY ITSELF OR BUNDLED WITH
                        THIRD PARTY DATA, OR DERIVATIVE ANALYSIS FROM ShopSeeker
                        CONTENT, TO TARGET USERS WITH ADVERTISING OUTSIDE OF THE
                        ShopSeeker PLATFORM, INCLUDING WITHOUT LIMITATION ON
                        OTHER ADVERTISING NETWORKS, VIA DATA BROKERS, OR THROUGH
                        ANY OTHER ADVERTISING OR MONETIZATION SERVICES.
                    </Div>
                    <Div className="h6">
                        C. GEOGRAPHIC DATA. YOUR LICENSE TO USE ShopSeeker
                        CONTENT IN THIS AGREEMENT DOES NOT ALLOW YOU TO (AND YOU
                        WILL NOT ALLOW OTHERS TO) AGGREGATE, CACHE, OR STORE
                        LOCATION DATA AND OTHER GEOGRAPHIC INFORMATION CONTAINED
                        IN THE ShopSeeker CONTENT, EXCEPT IN CONJUNCTION WITH THE
                        ShopSeeker CONTENT TO WHICH IT IS ATTACHED. YOUR LICENSE
                        ONLY ALLOWS YOU TO USE SUCH LOCATION DATA AND GEOGRAPHIC
                        INFORMATION TO IDENTIFY THE LOCATION TAGGED BY THE
                        ShopSeeker CONTENT. ANY USE OF LOCATION DATA OR
                        GEOGRAPHIC INFORMATION ON A STANDALONE BASIS OR BEYOND
                        THE LICENSE GRANTED HEREIN IS A BREACH OF THIS
                        AGREEMENT.
                    </Div>
                    <Div className="h6">
                        D. NO MONITORING OR MEASURING. NOTWITHSTANDING ANYTHING
                        TO THE CONTRARY, YOU MAY ONLY USE THE FOLLOWING
                        INFORMATION FOR NON-COMMERCIAL, INTERNAL PURPOSES (E.G.,
                        TO IMPROVE THE FUNCTIONALITY OF YOUR APPLICATION):
                        AGGREGATE ShopSeeker USER METRICS, SUCH AS NUMBER OF
                        ACTIVE USERS OR ACCOUNTS. ALL SUCH INFORMATION IS
                        ShopSeeker’S CONFIDENTIAL INFORMATION. YOU WILL NOT USE
                        OR ACCESS THE ShopSeeker CONTENT FOR PURPOSES OF CREATING
                        OR DISTRIBUTING A REGULARLY-PRODUCED, TIME-BASED SERIES
                        OF MEASUREMENTS MADE USING THE SAME, OR SIMILAR,
                        METHODOLOGIES FOR THE PURPOSE OF COMPARING TELEVISION
                        PROGRAM PERFORMANCE OVER TIME, OR AGAINST A DEFINED SET
                        OR SUBSET OF OTHER TELEVISION PROGRAMS.
                    </Div>
                    <Div className="h6">
                        E. COMPLIANCE. YOU WILL ABIDE BY ALL LIMITATIONS PLACED
                        ON YOUR ACCESS TO AND USE OF THE ShopSeeker CONTENT. YOU
                        WILL NOT ATTEMPT TO EXCEED OR CIRCUMVENT THESE LIMITS.
                        YOU WILL DELETE OR MODIFY ShopSeeker CONTENT AS NOTIFIED
                        BY ShopSeeker OR ITS AGENT AND IMPLEMENT THE NECESSARY
                        PROCESSES TO RECEIVE NOTIFICATION OF DELETED AND/OR
                        MODIFIED ShopSeeker CONTENT. ShopSeeker MAY MONITOR YOUR
                        USE OF THE CONTENT TO IMPROVE ShopSeeker’S OFFERINGS OR
                        TO ENSURE YOUR COMPLIANCE WITH THIS AGREEMENT.
                    </Div>
                </Div>
                <Div className="h5">
                    III. REMOVALS. IF AND WHEN REQUESTED BY ShopSeeker, YOU WILL
                    PROMPTLY
                </Div>
                <Div className="section">
                    <Div className="p">
                        (A) DELETE ShopSeeker CONTENT THAT IS REPORTED AS DELETED
                        OR EXPIRED;
                    </Div>
                    <Div className="p">
                        (B) CHANGE YOUR TREATMENT OF ShopSeeker CONTENT TO COMPLY
                        WITH ANY CHANGED SHARING OPTIONS APPLICABLE TO SUCH
                        ShopSeeker CONTENT; AND
                    </Div>
                    <Div className="p">
                        (C) MODIFY ShopSeeker CONTENT THAT IS REPORTED BY
                        ShopSeeker OR ITS AGENT AS HAVING BEEN MODIFIED.
                    </Div>
                </Div>
                <Div className="h5">
                    IV. AUDIT. ShopSeeker RESERVES THE RIGHT TO AUDIT YOUR
                    COMPLIANCE WITH THE TERMS AND CONDITIONS OF THIS AGREEMENT.
                    ShopSeeker OR ITS REPRESENTATIVE MAY, UPON REASONABLE NOTICE
                    DURING NORMAL BUSINESS HOURS, AUDIT AND INVESTIGATE YOUR USE
                    OF THE ShopSeeker CONTENT. YOU AGREE TO PERMIT ALL REASONABLE
                    ACCESS TO YOUR RECORDS AND COMPUTER SYSTEMS REQUESTED BY
                    ShopSeeker FOR THIS PURPOSE.
                </Div>
                <Div className="h5">V. OTHER IMPORTANT TERMS</Div>
                <Div className="section">
                    <Div className="h6">
                        A. USER PROTECTION. YOU WILL NOT KNOWINGLY DISPLAY,
                        DISTRIBUTE OR OTHERWISE MAKE AVAILABLE ShopSeeker CONTENT
                        TO ANY PERSON OR ENTITY THAT YOU REASONABLY BELIEVE WILL
                        USE SUCH CONTENT IN ANY MANNER THAT WOULD HAVE THE
                        POTENTIAL TO BE INCONSISTENT WITH ShopSeeker’S USERS’
                        REASONABLE EXPECTATIONS OF PRIVACY. YOU WILL NOT CONDUCT
                        AND WILL NOT PROVIDE ANALYSES OR RESEARCH THAT ISOLATES
                        A SMALL GROUP OF INDIVIDUALS OR ANY SINGLE INDIVIDUAL
                        FOR ANY UNLAWFUL OR DISCRIMINATORY PURPOSES. YOU WILL
                        NOT (AND WILL NOT PERMIT OTHERS TO) USE ShopSeeker
                        CONTENT TO TARGET, SEGMENT, OR PROFILE ANY INDIVIDUAL
                        USER, BASED ON HEALTH, NEGATIVE FINANCIAL STATUS OR
                        CONDITION, POLITICAL AFFILIATION OR BELIEFS, RACIAL OR
                        ETHNIC ORIGIN, RELIGIOUS OR PHILOSOPHICAL AFFILIATION OR
                        BELIEFS, SEX LIFE OR SEXUAL ORIENTATION, TRADE UNION
                        MEMBERSHIP, DATA RELATING TO ANY ALLEGED OR ACTUAL
                        COMMISSION OF A CRIME, OR ANY OTHER SENSITIVE CATEGORIES
                        OF PERSONAL INFORMATION PROHIBITED BY LAW.
                    </Div>
                    <Div className="h6">
                        B. SECURITY. CUSTOMER WILL KEEP ShopSeeker CONTENT
                        (INCLUDING, WHERE APPLICABLE, PERSONALLY IDENTIFIABLE
                        DATA) CONFIDENTIAL AND SECURE FROM UNAUTHORIZED ACCESS
                        BY USING INDUSTRY-STANDARD ORGANIZATIONAL AND TECHNICAL
                        SAFEGUARDS FOR SUCH DATA, AND WITH NO LESS CARE THAN IT
                        USES IN CONNECTION WITH SECURING SIMILAR DATA STORED BY
                        CUSTOMER. CUSTOMER WILL IMMEDIATELY NOTIFY ShopSeeker
                        CONSULT AND COOPERATE WITH INVESTIGATIONS, ASSIST WITH
                        ANY REQUIRED NOTICES, AND PROVIDE ANY INFORMATION
                        REASONABLY REQUESTED BY ShopSeeker IF CUSTOMER KNOWS OF
                        OR SUSPECTS ANY BREACH OF SECURITY OR POTENTIAL
                        VULNERABILITY OF THE ShopSeeker CONTENT AND WILL PROMPTLY
                        REMEDY SUCH BREACH OR POTENTIAL VULNERABILITY RESULTING
                        FROM CUSTOMER’S ACCESS TO THE ShopSeeker CONTENT.
                    </Div>
                    <Div className="h6">
                        C. GOVERNMENT USE. IF YOU WILL DISPLAY, DISTRIBUTE, OR
                        OTHERWISE MAKE AVAILABLE ShopSeeker CONTENT TO END USERS
                        ACTING ON BEHALF OF ANY GOVERNMENT-RELATED ENTITY, YOU
                        WILL IDENTIFY ALL SUCH GOVERNMENTRELATED ENTITIES TO
                        ShopSeeker. IF LAW ENFORCEMENT PERSONNEL REQUEST
                        INFORMATION ABOUT ShopSeeker OR ITS USERS FOR THE
                        PURPOSES OF AN ONGOING INVESTIGATION, YOU MAY REFER THEM
                        TO CONTACT WITH ShopSeeker.
                    </Div>
                    <Div className="h6">
                        D. DATA PROTECTION. AS SET FORTH IN THE ShopSeeker
                        PRIVACY POLICY (HTTPS://CA.SECSTEP.COM/PRIVACY), AND HAS
                        AUTHORIZED ShopSeeker TO LICENSE SUCH ShopSeeker CONTENT
                        UNDER THIS AGREEMENT. IF YOU ARE LOCATED OR TRANSFER
                        SUCH ShopSeeker CONTENT OUT OF (A) THE EUROPEAN ECONOMIC
                        AREA, OR (B) A JURISDICTION WHERE A EUROPEAN COMMISSION
                        POSITIVE ADEQUACY DECISION UNDER ARTICLE 25(6) OF
                        DIRECTIVE 95/46/EC IS IN FORCE AND COVERS SUCH TRANSFER,
                        THEN USE OF SUCH ShopSeeker CONTENT IS SUBJECT TO THE
                        MODEL CONTRACTUAL CLAUSES ANNEXED TO COMMISSION DECISION
                        2004/915/EC (THE "CLAUSES"), WHICH ARE HEREBY
                        INCORPORATED INTO THIS AGREEMENT. IN SUCH CASES, TIC IS
                        THE ‘DATA EXPORTER’ AND YOU ARE THE ‘DATA IMPORTER’ AS
                        DEFINED IN THE CLAUSES, AND YOU SELECT OPTION (III) OF
                        CLAUSE II(H) AND AGREES TO THE DATA PROCESSING
                        PRINCIPLES OF ANNEX A TO THE CLAUSES. FOR THE PURPOSES
                        OF ANNEX B TO THE CLAUSES, THE FOLLOWING SHALL APPLY:
                        (I) ‘DATA SUBJECTS’ ARE THE USERS OF THE ShopSeeker
                        APPLICATIONS OR INDIVIDUALS WHOSE PERSONAL DATA IS IN
                        THE ShopSeeker CONTENT; (II) THE ‘PURPOSE OF THE
                        TRANSFER(S)’ IS THE PERFORMANCE OF THIS AGREEMENT; (III)
                        THE ‘CATEGORIES OF DATA’ ARE ShopSeeker CONTENT AS
                        DEFINED HEREIN; (IV) THE ‘RECIPIENTS’ ARE END USERS; (V)
                        ‘SENSITIVE DATA’ IS PERSONAL DATA REGARDING AN
                        INDIVIDUAL’S RACIAL OR ETHNIC ORIGIN, POLITICAL
                        OPINIONS, RELIGIOUS OR PHILOSOPHICAL BELIEFS,
                        TRADE-UNION MEMBERSHIP, HEALTH OR SEX LIFE, CRIMINAL
                        CONVICTIONS OR ALLEGED COMMISSION OF AN OFFENSE; AND
                        (VI) THE ‘CONTACT POINTS FOR DATA PROTECTION ENQUIRIES’
                        ARE THE REPRESENTATIVES OF ShopSeeker AND YOU WITH
                        RESPONSIBILITY FOR DATA PRIVACY.
                    </Div>
                    <Div className="h6">
                        E. MANAGED SERVICE PROVIDERS. UNDER THE RIGHTS GRANTED
                        TO YOU IN SECTION B ABOVE, AND SUBJECT TO THE
                        RESTRICTIONS SET FORTH IN THIS AGREEMENT, CUSTOMER MAY
                        PERMIT ITS THIRD PARTY CONTRACTORS, AGENTS AND MANAGED
                        SERVICE PROVIDERS ("MSPS") TO ACCESS THE ShopSeeker
                        CONTENT, IN WHOLE OR IN PART, SOLELY ON BEHALF OF
                        CUSTOMER AND SOLELY THROUGH THE CLIENT APPLICATION
                        APPROVED UNDER THIS AGREEMENT TO ASSIST CUSTOMER AND
                        EXERCISE THE RIGHTS OF CUSTOMER SOLELY ON CUSTOMER’S
                        BEHALF; PROVIDED THAT (A) SUCH ACCESS AND USE BY EACH
                        MSP IS STRICTLY IN COMPLIANCE WITH THE TERMS AND
                        CONDITIONS OF THIS AGREEMENT, AND (B) CUSTOMER AT ALL
                        TIMES REMAINS IN CONTROL OF AND RETAINS MANAGEMENT OVER
                        THE LICENSED MATERIAL ("CONTROL", FOR PURPOSES OF THIS
                        CLAUSE, SHALL MEAN THE SOLE ABILITY TO DIRECT THE USE OF
                        THE LICENSED MATERIAL );. CUSTOMER SHALL BE FULLY
                        RESPONSIBLE FOR ITS MSPS’ COMPLIANCE WITH THIS
                        AGREEMENT, AND ANY CUSTOMER IS FULLY LIABLE FOR ANY AND
                        ALL BREACHES OF THIS AGREEMENT BY AN MSP. FOR CLARITY, A
                        MSP MAY INCLUDE YOUR CUSTOMER SERVICE MANAGEMENT
                        PROVIDER, AS LONG AS YOU RETAIN CONTROL OF THE ShopSeeker
                        CONTENT AT ALL TIMES.
                    </Div>
                </Div>
                <Div className="h5">
                    VI. WARRANTY DISCLAIMER. THE ShopSeeker CONTENT IS PROVIDED
                    TO YOU "AS IS", WITH ALL FAULTS AND ShopSeeker DISCLAIMS ALL
                    WARRANTIES, WHETHER EXPRESS, IMPLIED, STATUTORY, OR
                    OTHERWISE, INCLUDING WITHOUT LIMITATION WARRANTIES OF
                    MERCHANTABILITY, NONINFRINGEMENT, FITNESS FOR A PARTICULAR
                    PURPOSE, AND ANY WARRANTIES OR CONDITIONS ARISING OUT OF
                    THIS AGREEMENT, COURSE OF DEALING OR USAGE OF TRADE.
                    ShopSeeker DOES NOT WARRANT THAT THE ShopSeeker CONTENT OR ANY
                    OTHER ShopSeeker PRODUCT OR SERVICE PROVIDED HEREUNDER WILL
                    MEET ANY OF YOUR REQUIREMENTS OR THAT USE OF SUCH ShopSeeker
                    CONTENT OR OTHER PRODUCTS OR SERVICES WILL BE ERROR-FREE,
                    UNINTERRUPTED, VIRUS-FREE OR SECURE. THIS DISCLAIMER OF
                    WARRANTY MAY NOT BE VALID IN SOME JURISDICTIONS AND YOU MAY
                    HAVE WARRANTY RIGHTS UNDER LAW WHICH MAY NOT BE WAIVED OR
                    DISCLAIMED. ANY SUCH WARRANTY EXTENDS ONLY FOR THIRTY (30)
                    DAYS FROM THE EFFECTIVE DATE OF THIS AGREEMENT (UNLESS SUCH
                    LAW PROVIDES OTHERWISE).
                </Div>
                <Div className="h5">
                    VII. INDEMNIFICATION. YOU SHALL DEFEND ShopSeeker AGAINST ANY
                    AND ALL ACTIONS, DEMANDS, CLAIMS AND SUITS (INCLUDING
                    WITHOUT LIMITATION PRODUCT LIABILITY CLAIMS), AND INDEMNIFY
                    AND HOLD ShopSeeker HARMLESS FROM ANY AND ALL LIABILITIES,
                    DAMAGES AND COSTS (INCLUDING WITHOUT LIMITATION REASONABLE
                    ATTORNEYS’ FEES) TO THE EXTENT ARISING OUT OF YOUR USE OF
                    THE ShopSeeker CONTENT. IN THE EVENT ShopSeeker SEEKS
                    INDEMNIFICATION OR DEFENSE FROM YOU UNDER THIS PROVISION,
                    ShopSeeker WILL NOTIFY YOU IN WRITING OF THE CLAIM(S) BROUGHT
                    AGAINST ShopSeeker FOR WHICH IT SEEKS INDEMNIFICATION OR
                    DEFENSE. ShopSeeker RESERVES THE RIGHT, AT ITS OPTION AND
                    SOLE DISCRETION, TO ASSUME FULL CONTROL OF THE DEFENSE OF
                    CLAIMS WITH LEGAL COUNSEL OF ITS CHOICE. YOU MAY NOT ENTER
                    INTO ANY THIRD PARTY AGREEMENT THAT WOULD, IN ANY MANNER
                    WHATSOEVER, AFFECT THE RIGHTS OF ShopSeeker, CONSTITUTE AN
                    ADMISSION OF FAULT BY ShopSeeker OR BIND ShopSeeker, WITHOUT
                    THE PRIOR WRITTEN CONSENT OF ShopSeeker. IN THE EVENT
                    ShopSeeker ASSUMES CONTROL OF THE DEFENSE OF SUCH CLAIM,
                    ShopSeeker SHALL NOT SETTLE ANY SUCH CLAIM REQUIRING PAYMENT
                    FROM YOU WITHOUT YOUR PRIOR WRITTEN APPROVAL.
                </Div>
                <Div className="h5">
                    VIII. LIMITATION OF LIABILITY. IN NO EVENT WILL ShopSeeker BE
                    LIABLE TO YOU FOR ANY INDIRECT, SPECIAL, INCIDENTAL,
                    EXEMPLARY, PUNITIVE OR CONSEQUENTIAL DAMAGES OR ANY LOSS OF
                    USE, DATA OR PROFITS, OR DAMAGE TO BUSINESS OR GOODWILL,
                    ARISING OUT OF OR IN CONNECTION WITH THIS AGREEMENT. IN ANY
                    CASE, ShopSeeker’S AGGREGATE LIABILITY FOR ANY AND ALL CLAIMS
                    UNDER THIS AGREEMENT WILL NOT EXCEED $1.00 CAD. THE
                    FOREGOING LIMITATIONS, EXCLUSIONS AND DISCLAIMERS SHALL
                    APPLY REGARDLESS OF WHETHER SUCH LIABILITY ARISES FROM ANY
                    CLAIM BASED UPON CONTRACT, WARRANTY, TORT (INCLUDING
                    NEGLIGENCE), STRICT LIABILITY OR OTHERWISE, AND WHETHER OR
                    NOT THE PARTY HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH
                    LOSS OR DAMAGE. INSOFAR AS APPLICABLE LAW PROHIBITS ANY
                    LIMITATION ON LIABILITY HEREIN, THE PARTIES AGREE THAT SUCH
                    LIMITATION WILL BE AUTOMATICALLY MODIFIED, BUT ONLY TO THE
                    EXTENT SO AS TO MAKE THE LIMITATION COMPLIANT WITH
                    APPLICABLE LAW. THE PARTIES AGREE THAT THE LIMITATIONS ON
                    LIABILITIES SET FORTH HEREIN ARE AGREED ALLOCATIONS OF RISK
                    AND SUCH LIMITATIONS WILL APPLY NOTWITHSTANDING THE FAILURE
                    OF ESSENTIAL PURPOSE OF ANY LIMITED REMEDY.
                </Div>
                <Div className="h5">
                    IX. OWNERSHIP. THE ShopSeeker CONTENT IS LICENSED, NOT SOLD,
                    AND ShopSeeker RETAINS AND RESERVES ALL RIGHTS NOT EXPRESSLY
                    GRANTED IN THIS AGREEMENT. YOU EXPRESSLY ACKNOWLEDGES THAT
                    ShopSeeker, ITS LICENSORS AND ITS END USERS RETAIN ALL
                    WORLDWIDE RIGHT, TITLE AND INTEREST IN AND TO THE ShopSeeker
                    CONTENT AND ShopSeeker MARKS, INCLUDING ALL RIGHTS IN PATENTS
                    (INCLUDING ALL APPLICATIONS THEREFOR), TRADEMARKS, TRADE
                    NAMES, COPYRIGHTS, TRADE SECRETS, KNOW-HOW, DATA, AND ALL
                    PROPRIETARY RIGHTS UNDER THE LAWS OF THE UNITED STATES, ANY
                    OTHER JURISDICTION OR ANY TREATY ("IP RIGHTS"). YOU AGREES
                    NOT TO DO ANYTHING INCONSISTENT WITH SUCH OWNERSHIP,
                    INCLUDING WITHOUT LIMITATION, CHALLENGING ShopSeeker’S
                    OWNERSHIP OF IP RIGHTS, CHALLENGING THE VALIDITY OF THE
                    LICENSES GRANTED HEREIN, OR AFTER THE TERMINATION OF THIS
                    AGREEMENT, EXCEPT AS SPECIFICALLY AUTHORIZED HEREIN.
                </Div>
                <Div className="h5">
                    X. CONFIDENTIALITY. YOU MAY BE GIVEN ACCESS TO CERTAIN
                    NON-PUBLIC INFORMATION AND SPECIFICATIONS RELATING TO THE
                    ShopSeeker CONTENT OR THIS AGREEMENT ("CONFIDENTIAL
                    INFORMATION"), WHICH IS CONFIDENTIAL AND PROPRIETARY TO
                    ShopSeeker. YOU MAY USE THIS CONFIDENTIAL INFORMATION ONLY AS
                    NECESSARY IN EXERCISING YOUR RIGHTS GRANTED IN THIS
                    AGREEMENT. YOU MAY NOT DISCLOSE ANY OF THIS CONFIDENTIAL
                    INFORMATION TO ANY THIRD PARTY WITHOUT ShopSeeker’S PRIOR
                    WRITTEN CONSENT. YOU AGREE THAT YOU WILL PROTECT THIS
                    CONFIDENTIAL INFORMATION FROM UNAUTHORIZED USE, ACCESS, OR
                    DISCLOSURE IN THE SAME MANNER THAT YOU WOULD USE TO PROTECT
                    YOUR OWN CONFIDENTIAL AND PROPRIETARY INFORMATION OF A
                    SIMILAR NATURE AND IN NO EVENT WITH LESS THAN A REASONABLE
                    DEGREE OF CARE.
                </Div>
                <Div className="h5">
                    XI. TERMINATION. UNLESS TERMINATED EARLIER IN ACCORDANCE
                    WITH THIS SECTION , THIS AGREEMENT WILL BEGIN ON YOUR
                    ACCEPTANCE OF THE TERMS AND CONDITIONS HEREIN (OR THE FIRST
                    DAY THAT YOU USE THE ShopSeeker CONTENT) AND TERMINATE
                    IMMEDIATELY UPON THE EXPIRATION OR TERMINATION OF THE CLIENT
                    AGREEMENT ("TERM"). ShopSeeker MAY IMMEDIATELY SUSPEND YOUR
                    ACCESS TO THE ShopSeeker CONTENT (OR IF NECESSARY, TERMINATE
                    THIS AGREEMENT) AT ANY TIME, AND WITHOUT NOTICE TO YOU, IF
                    YOU BREACH ANY TERM OR CONDITION IN THIS AGREEMENT OR
                    OTHERWISE ENGAGE IN ACTIVITIES THAT ShopSeeker REASONABLY
                    DETERMINES MAY BE HARMFUL TO THE ShopSeeker CONTENT,
                    ShopSeeker, ITS END USERS OR THE REPUTATION OF ANY OF THE
                    FOREGOING PARTIES. ShopSeeker WILL NOT BE LIABLE FOR ANY
                    COSTS, EXPENSES, OR DAMAGES AS A RESULT OF ITS TERMINATION
                    OF THIS AGREEMENT.
                </Div>
                <Div className="h5">
                    XII. EFFECT OF TERMINATION. UPON THE EFFECTIVE DATE OF
                    TERMINATION OF THIS AGREEMENT
                </Div>
                <Div className="section">
                    <Div className="p">
                        (A) ALL RIGHTS AND LICENSES GRANTED HEREUNDER WILL
                        IMMEDIATELY CEASE;
                    </Div>
                    <Div className="p">
                        (B) YOU SHALL IMMEDIATELY DELETE ALL ShopSeeker CONTENT;
                        AND
                    </Div>
                    <Div className="p">
                        (C) WITHIN THIRTY (30) CALENDAR DAYS AFTER SUCH
                        TERMINATION, EACH PARTY WILL RETURN OR DESTROY ALL
                        CONFIDENTIAL INFORMATION OF THE OTHER PARTY IN ITS
                        POSSESSION AND WILL NOT MAKE OR RETAIN ANY COPIES OF
                        SUCH CONFIDENTIAL INFORMATION, EXCEPT AS REQUIRED TO
                        COMPLY WITH ANY APPLICABLE LEGAL OR ACCOUNTING RECORD
                        KEEPING REQUIREMENT, AND YOU WILL PERMANENTLY DELETE ALL
                        COPIES OF ShopSeeker CONTENT IN ALL FORMS AND TYPES OF
                        MEDIA IN YOUR POSSESSION. SECTIONS II, III, IV, V, VI,
                        VII, VIII, IX, X, XII AND XIII SHALL SURVIVE EXPIRATION
                        OR TERMINATION OF THIS AGREEMENT FOR ANY REASON. NEITHER
                        PARTY WILL BE LIABLE TO THE OTHER FOR ANY DAMAGES
                        RESULTING SOLELY FROM TERMINATION OF THIS AGREEMENT AS
                        PERMITTED UNDER THIS AGREEMENT.
                    </Div>
                </Div>
                <Div className="h5">
                    XIII. MISCELLANEOUS. THIS AGREEMENT CONSTITUTES THE ENTIRE
                    AGREEMENT AMONG THE PARTIES WITH RESPECT TO THE SUBJECT
                    MATTER AND SUPERSEDES AND MERGES ALL PRIOR PROPOSALS,
                    UNDERSTANDINGS AND CONTEMPORANEOUS COMMUNICATIONS. ANY
                    MODIFICATION TO THIS AGREEMENT MUST BE IN A WRITING SIGNED
                    BY BOTH YOU AND ShopSeeker. YOU MAY NOT ASSIGN ANY OF THE
                    RIGHTS OR OBLIGATIONS GRANTED HEREUNDER, IN WHOLE OR IN
                    PART, WHETHER VOLUNTARILY OR BY OPERATION OF LAW, CONTRACT,
                    MERGER (WHETHER YOU ARE THE SURVIVING OR DISAPPEARING
                    ENTITY), STOCK OR ASSET SALE, CONSOLIDATION, DISSOLUTION,
                    THROUGH GOVERNMENT ACTION OR OTHERWISE, EXCEPT WITH THE
                    PRIOR WRITTEN CONSENT OF ShopSeeker. ANY ATTEMPTED ASSIGNMENT
                    IN VIOLATION OF THIS PARAGRAPH IS NULL AND VOID, AND
                    ShopSeeker MAY TERMINATE THIS AGREEMENT IN THE EVENT OF ANY
                    SUCH ATTEMPTED ASSIGNMENT. THIS AGREEMENT DOES NOT CREATE OR
                    IMPLY ANY PARTNERSHIP, AGENCY OR JOINT VENTURE. THIS
                    AGREEMENT WILL BE GOVERNED BY AND CONSTRUED IN ACCORDANCE
                    WITH THE LAWS OF THE STATE OF CALIFORNIA, WITHOUT REGARD TO
                    OR APPLICATION OF CONFLICTS OF LAW RULES OR PRINCIPLES. ALL
                    CLAIMS ARISING OUT OF OR RELATING TO THIS AGREEMENT WILL BE
                    BROUGHT EXCLUSIVELY IN THE FEDERAL OR STATE COURTS OF SAN
                    FRANCISCO COUNTY, CALIFORNIA, USA, AND YOU CONSENT TO
                    PERSONAL JURISDICTION IN THOSE COURTS. DESPITE THE
                    FOREGOING, YOU AGREE THAT MONEY DAMAGES WOULD BE AN
                    INADEQUATE REMEDY FOR ShopSeeker IN THE EVENT OF A BREACH OR
                    THREATENED BREACH OF A PROVISION OF THIS AGREEMENT
                    PROTECTING ShopSeeker’S INTELLECTUAL PROPERTY OR CONFIDENTIAL
                    INFORMATION, AND THAT IN THE EVENT OF SUCH A BREACH OR
                    THREAT, ShopSeeker, IN ADDITION TO ANY OTHER REMEDIES TO
                    WHICH IT IS ENTITLED, IS ENTITLED TO SEEK PRELIMINARY OR
                    INJUNCTIVE RELIEF (INCLUDING AN ORDER PROHIBITING COMPANY
                    FROM TAKING ACTIONS IN BREACH OF SUCH PROVISIONS), WITHOUT
                    THE NEED FOR POSTING BOND, AND SPECIFIC PERFORMANCE AS MAY
                    BE APPROPRIATE. THE PARTIES AGREE THAT NEITHER THE UNITED
                    NATIONS CONVENTION ON CONTRACTS FOR THE INTERNATIONAL SALE
                    OF GOODS, NOR THE UNIFORM COMPUTER INFORMATION TRANSACTION
                    ACT (UCITA) SHALL APPLY TO THIS AGREEMENT, REGARDLESS OF THE
                    STATES IN WHICH THE PARTIES DO BUSINESS OR ARE INCORPORATED.
                    NO WAIVER BY ShopSeeker OF ANY COVENANT OR RIGHT UNDER THIS
                    AGREEMENT WILL BE EFFECTIVE UNLESS MEMORIALIZED IN A WRITING
                    DULY AUTHORIZED BY ShopSeeker. IF ANY PART OF THIS AGREEMENT
                    IS DETERMINED TO BE INVALID OR UNENFORCEABLE BY A COURT OF
                    COMPETENT JURISDICTION, THAT PROVISION WILL BE ENFORCED TO
                    THE MAXIMUM EXTENT PERMISSIBLE AND THE REMAINING PROVISIONS
                    OF THIS AGREEMENT WILL REMAIN IN FULL FORCE AND EFFECT.
                </Div>
            </Div>
        </Div>
    );
};

export default TermsPage;
