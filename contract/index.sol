pragma solidity ^0.8.0;

contract AddNote {
    event SentNote(address sender, string note);

    function addNote(string calldata _note) public {
        emit SentNote(msg.sender, _note);
    }
}
