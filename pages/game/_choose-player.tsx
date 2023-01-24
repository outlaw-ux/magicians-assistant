import React, { useCallback } from "react";
import type { IFriendProfile } from "../../utils/types";

export default function ChoosePlayer({
  friend,
  checked,
  onChange,
}: {
  friend: IFriendProfile;
  checked?: boolean;
  onChange?: (id: IFriendProfile["id"]) => void;
}) {
  const handleChange = useCallback(() => {
    onChange?.(friend.id);
  }, [onChange]);

  return (
    <li>
      <label>
        <input
          type="checkbox"
          value={friend.id}
          checked={checked}
          onChange={handleChange}
        />
        {friend.username}
      </label>
    </li>
  );
}
