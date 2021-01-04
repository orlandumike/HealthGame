CREATE TABLE [dbo].[Communication] (
    [CommunicationID]    UNIQUEIDENTIFIER CONSTRAINT [DF_PressArticle_PressArticleID] DEFAULT (newid()) NOT NULL,
    [Title]              NVARCHAR (255)   NOT NULL,
    [Description]        NVARCHAR (MAX)   NULL,
    [ImageUrl]           NVARCHAR (MAX)   NULL,
    [Url]                NVARCHAR (MAX)   NULL,
    [ActivityTypeStepID] INT              NULL,
    [RuleName]           NVARCHAR (50)    NOT NULL,
    CONSTRAINT [PK_Communication] PRIMARY KEY CLUSTERED ([CommunicationID] ASC),
    CONSTRAINT [FK_Communication_ActivityTypeStep] FOREIGN KEY ([ActivityTypeStepID]) REFERENCES [dbo].[ActivityTypeStep] ([ActivityTypeStepID])
);



