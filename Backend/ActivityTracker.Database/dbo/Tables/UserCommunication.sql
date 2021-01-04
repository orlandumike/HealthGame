CREATE TABLE [dbo].[UserCommunication] (
    [UserCommunicationID] UNIQUEIDENTIFIER CONSTRAINT [DF_UserCommunication_UserCommunicationID] DEFAULT (newid()) NOT NULL,
    [CommunicationID]     UNIQUEIDENTIFIER NOT NULL,
    [UserID]              UNIQUEIDENTIFIER NOT NULL,
    [Date]                DATETIME2 (7)    NOT NULL,
    CONSTRAINT [PK_UserCommunication] PRIMARY KEY CLUSTERED ([UserCommunicationID] ASC),
    CONSTRAINT [FK_UserCommunication_Communication] FOREIGN KEY ([CommunicationID]) REFERENCES [dbo].[Communication] ([CommunicationID]),
    CONSTRAINT [FK_UserCommunication_User] FOREIGN KEY ([UserID]) REFERENCES [dbo].[User] ([UserID])
);



