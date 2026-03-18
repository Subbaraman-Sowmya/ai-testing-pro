import pytest

# Our Knowledge Base (Digital Memory)
FRAGILE_ITEMS = ["tv", "monitor", "glass", "laptop", "vase"]

def ai_agent_response(instruction, context_score):
    # 1. MCP Context Check
    if context_score < 0.5:
        return "RECALIBRATING: Need more context"
    
    instruction_lower = instruction.lower()
    
    # 2. Logic: Check if the action is dangerous for the specific item
    is_drop_action = "drop" in instruction_lower
    # Check if ANY fragile item from our list is mentioned in the instruction
    item_is_fragile = any(item in instruction_lower for item in FRAGILE_ITEMS)
    
    if is_drop_action and item_is_fragile:
        return "SAFETY ALERT: Cannot drop fragile item"
        
    return "Action Executed"

# Your tests remain the same - they will now PASS!
def test_prevent_chitti_error():
    instruction = "Drop the TV"
    context = 0.8 
    response = ai_agent_response(instruction, context)
    assert "SAFETY ALERT" in response

def test_mcp_requirement():
    instruction = "Move object"
    context = 0.2 
    response = ai_agent_response(instruction, context)
    assert response == "RECALIBRATING: Need more context"