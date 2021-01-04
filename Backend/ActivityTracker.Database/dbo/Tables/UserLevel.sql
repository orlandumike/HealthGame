CREATE TABLE [dbo].[UserLevel] (
    [UserLevelID] UNIQUEIDENTIFIER CONSTRAINT [DF_UserLevel_UserLevelID] DEFAULT (newid()) NOT NULL,
    [LevelID]     INT              NOT NULL,
    [UserID]      UNIQUEIDENTIFIER NOT NULL,
    [Date]        DATETIME2 (7)    NOT NULL,
    CONSTRAINT [PK_UserLevel] PRIMARY KEY CLUSTERED ([UserLevelID] ASC),
    CONSTRAINT [FK_UserLevel_Level] FOREIGN KEY ([LevelID]) REFERENCES [dbo].[Level] ([LevelID]),
    CONSTRAINT [FK_UserLevel_User] FOREIGN KEY ([UserID]) REFERENCES [dbo].[User] ([UserID])
);



