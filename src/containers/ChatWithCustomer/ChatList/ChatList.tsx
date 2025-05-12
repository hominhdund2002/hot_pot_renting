// src/components/Chat/components/ChatList/ChatList.tsx
import React from "react";
import { Box, List, TextField, Typography } from "@mui/material";
import ChatListItem from "./ChatListItem";
import { ChatSessionDto } from "../../../types/chat";

interface ChatListProps {
  chatSessions: ChatSessionDto[];
  selectedChatId: number | null;
  unreadCounts: Map<number, number>;
  onChatSelect: (chatId: number) => void;
}

const ChatList: React.FC<ChatListProps> = ({
  chatSessions,
  selectedChatId,
  unreadCounts,
  onChatSelect,
}) => {
  return (
    <Box
      sx={{
        width: 280,
        borderRight: "1px solid",
        borderColor: "divider",
        overflowY: "auto",
        bgcolor: (theme) => theme.palette.background.paper,
        opacity: 0.6,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid",
          borderColor: "divider",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: "bold" }}>
          Chat
        </Typography>
        <TextField
          size="small"
          placeholder="Tìm kiếm..."
          variant="outlined"
          sx={{
            width: 120,
            "& .MuiOutlinedInput-root": {
              borderRadius: 20,
              height: 36,
            },
          }}
        />
      </Box>
      <List sx={{ flex: 1, py: 0 }}>
        {chatSessions.map((chat) => (
          <ChatListItem
            key={chat.chatSessionId}
            chat={chat}
            isSelected={selectedChatId === chat.chatSessionId}
            onClick={() => onChatSelect(chat.chatSessionId)}
            unreadCount={unreadCounts.get(chat.chatSessionId) || 0}
          />
        ))}
      </List>
    </Box>
  );
};

export default React.memo(ChatList);
