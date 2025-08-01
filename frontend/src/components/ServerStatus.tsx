import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Server, AlertCircle } from "lucide-react";
import { apiService } from "@/services/api";

const ServerStatus = () => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);
  const [lastCheck, setLastCheck] = useState<Date | null>(null);

  const checkServerHealth = async () => {
    try {
      const response = await fetch(`${process.env.VITE_API_BASE_URL || 'http://localhost:3001'}/api/health`);
      const isHealthy = response.ok;
      setIsOnline(isHealthy);
      setLastCheck(new Date());
    } catch (error) {
      setIsOnline(false);
      setLastCheck(new Date());
    }
  };

  useEffect(() => {
    // Initial check
    checkServerHealth();
    
    // Check every 30 seconds
    const interval = setInterval(checkServerHealth, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = () => {
    if (isOnline === null) return "bg-gray-400"; // Loading
    return isOnline ? "bg-green-500" : "bg-red-500";
  };

  const getStatusText = () => {
    if (isOnline === null) return "Checking server...";
    return isOnline ? "Server Online" : "Server Offline";
  };

  const getLastCheckText = () => {
    if (!lastCheck) return "";
    const minutes = Math.floor((Date.now() - lastCheck.getTime()) / 60000);
    if (minutes === 0) return "Just checked";
    return `Last checked ${minutes}m ago`;
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Link to="/api-test">
            <Button 
              variant="ghost" 
              size="sm" 
              className="gap-2 hover:bg-card/50 px-3"
            >
              <div className="flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${getStatusColor()} animate-pulse`}></div>
                <Server className="w-4 h-4 text-muted-foreground" />
              </div>
            </Button>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-48">
          <div className="text-sm">
            <div className="flex items-center gap-2 mb-1">
              {isOnline === false && <AlertCircle className="w-3 h-3 text-red-500" />}
              <span className="font-medium">{getStatusText()}</span>
            </div>
            {lastCheck && (
              <div className="text-xs text-muted-foreground">
                {getLastCheckText()}
              </div>
            )}
            <div className="text-xs text-muted-foreground mt-1 pt-1 border-t border-border/50">
              Click to access API test dashboard
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default ServerStatus; 