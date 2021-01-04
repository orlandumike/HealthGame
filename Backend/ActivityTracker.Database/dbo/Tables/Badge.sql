CREATE TABLE [dbo].[Badge] (
    [BadgeID]     UNIQUEIDENTIFIER CONSTRAINT [DF_Badge_BadgeID] DEFAULT (newid()) NOT NULL,
    [Name]        NVARCHAR (255)   NOT NULL,
    [Description] NVARCHAR (500)   NULL,
    [ImageUrl]    NVARCHAR (255)   NULL,
    [RuleName]   NVARCHAR (50)    NULL,
    CONSTRAINT [PK_Badge] PRIMARY KEY CLUSTERED ([BadgeID] ASC)
);



