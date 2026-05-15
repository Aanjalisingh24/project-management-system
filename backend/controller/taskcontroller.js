const Task = require('../models/taskmodel');
const Project = require('../models/projectmodels');


async function addtask(req, res) {
    try {
        const { title,
            description,
            projectId,
            clientId,
            assignedTo,
            deadline
        } = req.body

        const project = await Project.findById(projectId);

        if (!project) {
            return res.status(404).json({ message: "Project not found" });
        }

        const taskDeadline = new Date(deadline);
        const projectDeadline = new Date(project.deadline);

        if (taskDeadline > projectDeadline) {
            return res.status(400).json({
                message: "Task deadline cannot be greater than project deadline"
            });
        }
        const task = await new Task({
            title,
            description,
            projectId,
            clientId,
            assignedTo,
            deadline
        })

        await task.save();

        return res.status(201).json({ message: "added task sucessfully", task })
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }
}

async function gettask(req, res) {
    try {
        const task = await Task.find()
            .populate("projectId", "projectName")
            .populate("clientId", "name")
            .populate("assignedTo", "name")
        if (!task) {
            return res.status(404).json({ message: "task not found" })
        }

        return res.status(200).json({ task });
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

async function gettaskbyid(req, res) {
    try {
        const task = await Task.findById(req.params._id);
        if (!task) {
            return res.status(404).json({ message: "task not found" })
        }
        return res.status(200).json(task)
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

async function updatetask(req, res) {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, req.body,
            { new: true, runValidators: true }
        )
        if (!task) {
            return res.status(404).json({ message: "task not found" })
        }

        const project = await Project.findById(task.projectId);

        if (req.body.deadline) {
            const taskDeadline = new Date(req.body.deadline);
            const projectDeadline = new Date(project.deadline);

            if (taskDeadline > projectDeadline) {
                return res.status(400).json({
                    message: "Task deadline cannot be greater than project deadline"
                });
            }
        }
        await updateProjectStatus(task.projectId);
        return res.status(200).json({ message: "task updated", task })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

async function Delete(req, res) {
    try {
        const task = await Task.findByIdAndDelete(req.params._id);
        if (!task) {
            return res.status(404).json({ message: "task not found" })
        }
        return res.status(200).json({ message: "task deleted sucessfully", task })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

async function getmytask(req, res) {
    try {
        const task = await Task.find({ assignedTo: req.user.userid })
            .populate("projectId");
        if (!task) {
            return res.status(404).json({ message: "task not found" })
        }
        return res.status(200).json({ task })
    }
    catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

async function updatestatus(req, res) {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            {
                status: req.body.status
            },
            {
                new: true, runValidators: true
            }
        );
        res.json({ message: "status updated sucessfully" })
    }
    catch (err) {
        res.status(500).json({ message: err.message })
    }

}


async function updateProjectStatus(projectId) {
    const totalTasks = await Task.countDocuments({ projectId });

    const completedTasks = await Task.countDocuments({
        projectId,
        status: "completed"
    });

    let status = "pending";

    if (totalTasks > 0 && totalTasks === completedTasks) {
        status = "completed";
    }

    await Project.findByIdAndUpdate(projectId, { status });
}

module.exports = { addtask, gettask, gettaskbyid, updatetask, Delete, getmytask, updatestatus, updateProjectStatus };