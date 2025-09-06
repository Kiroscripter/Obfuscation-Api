-- Roblox LocalScript example

local HttpService = game:GetService("HttpService")
local RUN_SERVICE = game:GetService("RunService")

local apiUrl = "https://your-api.vercel.app/script?key=YOUR_KEY_HERE"
local fetchedScript

-- Function to fetch script safely
local function fetchScript()
    local success, result = pcall(function()
        return HttpService:GetAsync(apiUrl)
    end)
    
    if success then
        fetchedScript = result
        -- Run the fetched script
        local func = loadstring(fetchedScript)
        if func then func() end
        print("Script executed successfully")
    else
        warn("Failed to fetch script: "..tostring(result))
    end
end

-- Fetch script on game start
fetchScript()

-- Optional: refresh periodically (e.g., every hour)
-- RunService.Heartbeat:Connect(function()
--     if not fetchedScript then fetchScript() end
-- end)
