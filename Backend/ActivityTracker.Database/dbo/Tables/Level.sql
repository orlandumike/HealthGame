CREATE TABLE [dbo].[Level] (
    [LevelID]               INT            NOT NULL,
    [Name]                  NVARCHAR (255) NOT NULL,
    [ExperienceRequirement] INT            NOT NULL,
    [ImageUrl]              NVARCHAR (255) NULL,
    CONSTRAINT [PK_Level] PRIMARY KEY CLUSTERED ([LevelID] ASC)
);



