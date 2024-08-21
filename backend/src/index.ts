require("dotenv").config();

import "./shared/infra/http/app";
import "./shared/infra/database/mongodb/hooks";

// subdomains events subscribers
import "./modules/notification";
