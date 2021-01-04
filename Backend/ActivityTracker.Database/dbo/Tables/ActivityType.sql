CREATE TABLE [dbo].[ActivityType] (
    [ActivityTypeID]     INT            NOT NULL,
    [Code]               NVARCHAR (50)  NOT NULL,
    [Name]               NVARCHAR (255) NOT NULL,
    [Unit]               NVARCHAR (50)  NULL,
    [QuantityMultiplier] FLOAT (53)     NOT NULL,
    CONSTRAINT [PK_ActivityType] PRIMARY KEY CLUSTERED ([ActivityTypeID] ASC),
    CONSTRAINT [UK_Code] UNIQUE (Code)
);



