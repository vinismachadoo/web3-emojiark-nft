// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

// We first import some OpenZeppelin Contracts.
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

// We need to import the helper functions from the contract that we copy/pasted.
import { Base64 } from "./libraries/Base64.sol";

contract MyEpicNFT is ERC721URIStorage {
    // Magic given to us by OpenZeppelin to help us keep track of tokenIds.
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    // This is our SVG code. All we need to change is the word that's displayed. Everything else stays the same.
    // So, we make a baseSvg variable here that all our NFTs can use.
    string baseSvg = "<svg xmlns='http://www.w3.org/2000/svg' preserveAspectRatio='xMinYMin meet' viewBox='0 0 300 300'><style>.base { fill: white; font-family: serif; font-size: 50px; }</style>";
    
    mapping (string => string) public rectangles;

    // These Nine arrays, each with their own theme of random emojis.
    // They'll be input for random picker
    string[] arrayOne = [unicode"🐸", unicode"🦆", unicode"🦚", unicode"🐊", unicode"🐢", unicode"🪲"];
    string[] arrayTwo = [unicode"🐠", unicode"🐬", unicode"🕷️", unicode"🐋", unicode"🐟", unicode"🪰"];
    string[] arrayThree = [unicode"🐺", unicode"🦭", unicode"🐘", unicode"🐰", unicode"🐰", unicode"🦝"];
    string[] arrayFour = [unicode"🦁", unicode"🐱", unicode"🦊", unicode"🦒", unicode"🦧", unicode"🐯"];
    string[] arrayFive = [unicode"🦩", unicode"🐷", unicode"🐭", unicode"🐡", unicode"🐮", unicode"🦛"];
    string[] arraySix = [unicode"🐞", unicode"🦞", unicode"🦑", unicode"🦋", unicode"🦜", unicode"🐙"];
    string[] arraySeven = [unicode"🐐", unicode"🦔", unicode"🐶", unicode"🦉", unicode"🦥", unicode"🦌"];
    string[] arrayEight = [unicode"🦃", unicode"🐴", unicode"🦦", unicode"🦂", unicode"🐵", unicode"🐻"];
    string[] arrayNine = [unicode"🦫", unicode"🐧", unicode"🦙", unicode"🦓", unicode"🐼", unicode"🐝"];

    event NewEpicNFTMinted(address sender, uint256 tokenId, string tokenUri);

    struct EpicNft { // struct -> custom datatype (schema)
        address sender; // The address of the user who waved.
        uint256 tokenId; // The number of the nft minted.
        string tokenUri; // The nft metadata.
    }

    EpicNft[] epicNfts; // variable wave will store an array of structs Wave

    // We need to pass the name of our NFTs token and it's symbol.
    constructor() ERC721 ("Emoji's Ark", "SQUARE") {
        rectangles["FIRST"] = "<rect width='100' height='100' x='0' y='0' fill='#D0EBC5' /><text x='50' y='50' class='base' dominant-baseline='middle' text-anchor='middle'>";
        rectangles["SECOND"] = "<rect width='100' height='100' x='100' y='0' fill='#89C4C2' /><text x='150' y='50' class='base' dominant-baseline='middle' text-anchor='middle'>";
        rectangles["THIRD"] = "<rect width='100' height='100' x='200' y='0' fill='#CFCFC4' /><text x='250' y='50' class='base' dominant-baseline='middle' text-anchor='middle'>";
        rectangles["FOURTH"] = "<rect width='100' height='100' x='0' y='100' fill='#F9D4A4' /><text x='50' y='150' class='base' dominant-baseline='middle' text-anchor='middle'>";
        rectangles["FIFTH"] = "<rect width='100' height='100' x='100' y='100' fill='#FFB8F3' /><text x='150' y='150' class='base' dominant-baseline='middle' text-anchor='middle'>";
        rectangles["SIXTH"] = "<rect width='100' height='100' x='200' y='100' fill='#F5A2A2' /><text x='250' y='150' class='base' dominant-baseline='middle' text-anchor='middle'>";
        rectangles["SEVENTH"] = "<rect width='100' height='100' x='0' y='200' fill='#F3F7C1' /><text x='50' y='250' class='base' dominant-baseline='middle' text-anchor='middle'>";
        rectangles["EIGHTH"] = "<rect width='100' height='100' x='100' y='200' fill='#D6BD8B' /><text x='150' y='250' class='base' dominant-baseline='middle' text-anchor='middle'>";
        rectangles["NINETH"] = "<rect width='100' height='100' x='200' y='200' fill='#363636' /><text x='250' y='250' class='base' dominant-baseline='middle' text-anchor='middle'>";
        
        console.log("This is my NFT contract. Woah!");
    }

    // return random number from a string input
    function random(string memory input) internal pure returns (uint256) {
        return uint256(keccak256(abi.encodePacked(input)));
    }

    // uint256 is a int number
    // string is a pure string
    // string[] is an array of strings
    function pickRandomEmoji(uint256 tokenId, string memory position, string[] memory emojiArray) internal pure returns (string memory) {
        // concatenate all strings, and wrap with random function
        uint256 rand = random(string(abi.encodePacked(position, Strings.toString(tokenId))));
        rand = rand % emojiArray.length;
        return emojiArray[rand];
    }

    function makeSvgSquare(uint256 tokenId, string memory position, string[] memory emojiArray) public view returns (string memory) {
        string memory emoji = pickRandomEmoji(tokenId, position, emojiArray);
        string memory rectSvg = rectangles[position];
        // concatenate all strings
        string memory finalRect = string(abi.encodePacked(rectSvg, emoji, "</text>"));
        return finalRect;
    }

    // A function our user will hit to get their NFT.
    function makeAnEpicNFT() public {
        // Get the current tokenId, this starts at 0.
        uint256 newItemId = _tokenIds.current();

        // Generate a string of one square + emoji for the svg picture.
        string memory one = makeSvgSquare(newItemId, "FIRST", arrayOne);
        string memory two = makeSvgSquare(newItemId, "SECOND", arrayTwo);
        string memory three = makeSvgSquare(newItemId, "THIRD", arrayThree);
        string memory four = makeSvgSquare(newItemId, "FOURTH", arrayFour);
        string memory five = makeSvgSquare(newItemId, "FIFTH", arrayFive);
        string memory six = makeSvgSquare(newItemId, "SIXTH", arraySix);
        string memory seven = makeSvgSquare(newItemId, "SEVENTH", arraySeven);
        string memory eight = makeSvgSquare(newItemId, "EIGHTH", arrayEight);
        string memory nine = makeSvgSquare(newItemId, "NINETH", arrayNine);

        string memory finalSvg = string(abi.encodePacked(baseSvg, one, two, three, four, five, six, seven, eight, nine, "</svg>"));
        
        // Set the NFTs data.
        // https://www.utilities-online.info/base64
        // https://www.svgviewer.dev/
        // 1 - encode in base64 the image (svg)
        // 2 - url eqs data:image/svg+xml;base64,BASE64_STRING
        // 3 - encode the json file where image value is the url above
        // 4 - url eqs data:application/json;base64,BASE64_STRING
        
        // Get all the JSON metadata in place and base64 encode it.
        string memory json = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "Emoji Ark #',
                        // We set the title of our NFT as the generated word.
                        Strings.toString(newItemId),
                        '", "description": "A cute collection of animals to save and bring to the world.", "image": "data:image/svg+xml;base64,',
                        // We add data:image/svg+xml;base64 and then append our base64 encode our svg.
                        Base64.encode(bytes(finalSvg)),
                        '"}'
                    )
                )
            )
        );
        
        // Just like before, we prepend data:application/json;base64, to our data.
        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log("\n--------------------");
        // log the full url to preview the nft metadata
        console.log(
            string(
                abi.encodePacked(
                    "https://nftpreview.0xdev.codes/?code=",
                    finalTokenUri
                )
            )
        );
        console.log("--------------------\n");

        // Actually mint the NFT to the sender using msg.sender.
        _safeMint(msg.sender, newItemId);

        
        _setTokenURI(newItemId, finalTokenUri);

        // store the nft metadata in the array
        epicNfts.push(EpicNft(msg.sender, newItemId, finalTokenUri));

        console.log("An NFT w/ ID %s has been minted to %s", newItemId, msg.sender);
        
        // Increment the counter for when the next NFT is minted.
        _tokenIds.increment();

        emit NewEpicNFTMinted(msg.sender, newItemId, finalTokenUri);
    }

    function getAllNfts() public view returns (EpicNft[] memory) {
        return epicNfts;
    }
}