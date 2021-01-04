using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ActivityTracker.API
{
    public class NotExistingUserException : Exception { }
    public class AlreadyExistingUserActivityException : Exception { }
    public class NotExistingActivityTypeCodeException : Exception { }
}
