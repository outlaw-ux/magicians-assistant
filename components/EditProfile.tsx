import React, { useCallback, useState } from "react";
import { username as generateUsername } from "react-lorem-ipsum";
import { useProfileContext } from "../context";

const EditProfile = () => {
  const { username, saveProfile } = useProfileContext();
  const [newUsername, setNewUsername] = useState(username);

  const handleGenerateUsername = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      setNewUsername(generateUsername());
    },
    [setNewUsername]
  );
  const handleSaveProfile = useCallback(() => {
    saveProfile({ username: newUsername });
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
