import React, { useCallback, useState } from "react";
import randomWords from "random-words";
import { useProfileContext } from "../context";

const EditProfile = () => {
  const { username, saveProfile } = useProfileContext();
  const [newUsername, setNewUsername] = useState(username);

  const handleGenerateUsername = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      const randomUsername = randomWords({ exactly: 2, join: "-" });
      const randomNumber = Math.floor(1000 + Math.random() * 9000);
      setNewUsername(`${randomUsername}-${randomNumber}`);
    },
    [setNewUsername]
  );
  const handleSaveProfile = useCallback(() => {
    saveProfile({
      username: encodeURIComponent(`${newUsername?.toLowerCase().trim()}`),
    });
  }, [newUsername, saveProfile]);
  const handleNewUsername = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = event.target;
      setNewUsername(value);
    },
    [setNewUsername]
  );

  return (
    <>
      <p>The screename other players will use to find you</p>
      <div>
        <label htmlFor="new-username">Username</label>
        <input
          type="text"
          id="new-username"
          value={newUsername || ""}
          onChange={handleNewUsername}
        />
        <button type="submit" onClick={handleSaveProfile}>
          Save
        </button>
        <p>
          <a href="#" onClick={handleGenerateUsername}>
            Generate Username
          </a>
        </p>
      </div>
    </>
  );
};

export default EditProfile;
