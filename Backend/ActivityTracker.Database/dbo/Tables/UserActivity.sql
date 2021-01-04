CREATE TABLE [dbo].[UserActivity] (
    [UserActivityID] UNIQUEIDENTIFIER CONSTRAINT [DF_UserActivity_ActivityID] DEFAULT (newid()) NOT NULL,
    [Date]           DATETIME2 (7)    NOT NULL,
    [Quantity]       INT              NOT NULL,
    [HealthPoints]   INT              NOT NULL,
    [UserID]         UNIQUEIDENTIFIER NOT NULL,
    [ActivityTypeID] INT              NOT NULL,
    [ExternalID]     NVARCHAR (255)   NULL,
    CONSTRAINT [PK_UserActivity] PRIMARY KEY CLUSTERED ([UserActivityID] ASC),
    CONSTRAINT [FK_UserActivity_ActivityType] FOREIGN KEY ([ActivityTypeID]) REFERENCES [dbo].[ActivityType] ([ActivityTypeID]),
    CONSTRAINT [FK_UserActivity_User] FOREIGN KEY ([UserID]) REFERENCES [dbo].[User] ([UserID])
);




GO


