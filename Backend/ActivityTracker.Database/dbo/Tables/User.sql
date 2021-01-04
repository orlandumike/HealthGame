CREATE TABLE [dbo].[User] (
    [UserID]           UNIQUEIDENTIFIER CONSTRAINT [DF_User_UserID] DEFAULT (newid()) NOT NULL,
    [UTN]              INT              NOT NULL,
    [HealthPoints]     INT              CONSTRAINT [DF_User_HealthPoints] DEFAULT ((1)) NOT NULL,
    [Name]             NVARCHAR (50)    NOT NULL,
    [Birthdate]        DATE             NULL,
    [AvatarUrl]        NVARCHAR (MAX)   NULL,
    [SubscriptionDate] DATE             NOT NULL,
    [ExternalID]       NVARCHAR (MAX)   NULL,
    CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED ([UserID] ASC),
    CONSTRAINT [UK_UTN] UNIQUE (UTN)
);





