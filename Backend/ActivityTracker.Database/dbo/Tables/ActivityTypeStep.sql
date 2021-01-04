CREATE TABLE [dbo].[ActivityTypeStep] (
    [ActivityTypeStepID] INT NOT NULL,
    [ActivityTypeID]     INT NOT NULL,
    [Requirement]        INT NOT NULL,
    CONSTRAINT [PK_ActivityTypeStep] PRIMARY KEY CLUSTERED ([ActivityTypeStepID] ASC),
    CONSTRAINT [FK_ActivityTypeStep_ActivityType] FOREIGN KEY ([ActivityTypeID]) REFERENCES [dbo].[ActivityType] ([ActivityTypeID])
);

