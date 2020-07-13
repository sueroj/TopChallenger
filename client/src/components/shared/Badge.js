// Badge
// Purpose: Draws badge image as button that displays modal on click. 
// Export: BadgeRow
// --TBD-- 
// Add component BadgeCanvas to automate draw of badge image (similar to RankCanvas). Reference color scheme.
// Add tooltip to display challenge description.
// Increase image size to 60x60px.
// Eval move to /focus.
import React, { useState } from 'react';
import Image from 'react-bootstrap/Image';
import './css/Badge.css';
import ChallengeModal from './ChallengeModal';
import BadgeCanvas from './BadgeCanvas';
import challengeType from 'common/challengeType.json';
import tier from 'common/tier.json';

function Badge(props) {
    const [viewModal, toggleModal] = useState(false);

    function toggleChallengeModal() {
        toggleModal(!viewModal);
    }

    const importAsset = (type, challengeId) => {
        let asset = [];
        try {
            asset = require(`assets/${type}/${challengeId}.png`);
        } catch {
            asset = require(`assets/${type}/default.png`);
        }
        return asset;
    }

    function completedBadgeSelect() {
        if (props.challenge.Type === challengeType.TIMETRIAL || props.challenge.Type === challengeType.ROUTE)
        {
            switch (props.completed.tier)
            {
                case tier.GOLD:
                    return <Image className="badge-img" src={importAsset("scheme_geometric/badges/complete", props.challenge.ChallengeId)} alt={props.challenge.Name} rounded />
                case tier.SILVER:
                    return <Image className="badge-img" src={importAsset("scheme_geometric/badges/silver", props.challenge.ChallengeId)} alt={props.challenge.Name} rounded />
                case tier.BRONZE:
                    return <Image className="badge-img" src={importAsset("scheme_geometric/badges/bronze", props.challenge.ChallengeId)} alt={props.challenge.Name} rounded />
                default:
                    return <Image className="badge-img" src={importAsset("scheme_geometric/badges/complete", props.challenge.ChallengeId)} alt={props.challenge.Name} rounded />
            }
        } 
        else return <Image className="badge-img" src={importAsset("badges/complete", props.challenge.ChallengeId)} alt={props.challenge.Name} rounded />
    }

    return (
        <>
            <ChallengeModal show={viewModal} toggleChallengeModal={toggleChallengeModal} {...props} />

            <button className="badge-wrapper" onClick={toggleChallengeModal}>
                {props.completed.status ? completedBadgeSelect() :
                    // Image style badges
                    <Image className="badge-img" src={importAsset("scheme_geometric/badges", props.challenge.ChallengeId)} alt={props.challenge.Name} rounded />}
                    {/* //  // Canvas style badges
                    // <BadgeCanvas id={props.challenge.ChallengeId} challenge={props.challenge} useDefault={true} />} */}
                <div className="badge-rp">{props.challenge.Rp} RP</div>
                <div className="badge-name-header">{props.challenge.Name}</div>
            </button>
        </>
    );
}

export default Badge;