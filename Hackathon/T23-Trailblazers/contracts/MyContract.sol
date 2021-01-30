// SPDX-License-Identifier: MIT
// pragma experimental ABIEncoderV2;
pragma solidity 0.7.0;

contract MyContract {
    struct FileDetails {
        string uploader_name;
        uint256 timestamp;
        string imgHash;
    }

    mapping(string => FileDetails) public hashDetails;

    function sethashDetails(
        string memory _uploader_name,
        uint256 _timestamp,
        string memory _imgHash
    ) public {
        hashDetails[_imgHash].imgHash = _imgHash;
        hashDetails[_imgHash].timestamp = _timestamp;
        hashDetails[_imgHash].uploader_name = _uploader_name;
    }

    function verifyDetails(string memory _imgHash)
        public
        view
        returns (
            string memory uploader_name,
            uint256 timestamp,
            string memory imgHash
        )
    {
        return (
            hashDetails[_imgHash].uploader_name,
            hashDetails[_imgHash].timestamp,
            hashDetails[_imgHash].imgHash
        );
    }
}
