import { useCallback, useEffect, useState } from "react";
import { useGameContext } from "../../context";
import type { IFriendProfile } from "../../utils/types";

export default function MutualFriend({ id, username }: IFriendProfile) {
  const { activeGame, addToGame, isInGame, isInvitedToActiveGame } =
    useGameContext();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isInvited, setIsInvited] = useState(false);
  const [buttonLabel, setButtonLabel] = useState("Locating");

  const getButtonLabel = useCallback(() => {
    console.log({ activeGame });
    isInGame(id).then((isPlaying) => {
      isInvitedToActiveGame(id).then((isInvited) => {
        setButtonLabel(
          isPlaying ? "In Game" : isInvited ? "Already Invited" : "Add Player"
        );
      });
    });
  }, [activeGame]);

  useEffect(() => {
    getButtonLabel();
  }, [getButtonLabel]);

  return (
    <li key={id}>
      {username} &mdash;{" "}
      {activeGame ? (
        <button
          type="button"
          disabled={isPlaying || isInvited}
          onClick={() => addToGame(id)}>
          {buttonLabel}
        </button>
      ) : (
        <em>Start Game to add players</em>
      )}
    </li>
  );
}
